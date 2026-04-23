import React, { useState } from 'react';
import { Camera, Image as ImageIcon, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { analyzePanelImage } from '../services/geminiService';
import { AnalysisResult } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function ImageProcessor() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setImage(base64);
      setAnalyzing(true);
      setResult(null);
      
      const analysis = await analyzePanelImage(base64);
      setResult(analysis);
      setAnalyzing(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-[32px] shadow-sm border border-natural-sage-soft">
        <h3 className="text-xl font-bold text-natural-muted mb-2 tracking-tight">AI Görüntü Analizi (Python CV Engine)</h3>
        <p className="text-natural-muted/60 mb-6 text-sm">
          Güneş paneli üzerindeki kirliliği tespit etmek için bir fotoğraf yükleyin.
        </p>

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-natural-border rounded-[24px] p-12 transition-colors hover:border-natural-sage bg-natural-sage-soft/30 group">
          <input
            type="file"
            id="panel-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label htmlFor="panel-upload" className="cursor-pointer flex flex-col items-center">
            {image ? (
              <img src={image} alt="Uploaded" className="w-full max-h-64 object-contain rounded-2xl mb-4 shadow-lg border border-natural-border" />
            ) : (
              <div className="bg-white p-6 rounded-3xl shadow-sm group-hover:scale-110 transition-transform mb-4 border border-natural-border/30">
                <Camera className="w-10 h-10 text-natural-sage/50 group-hover:text-natural-sage transition-colors" />
              </div>
            )}
            <span className="text-sm font-bold text-natural-muted uppercase tracking-wider">Fotoğraf Seç</span>
            <span className="text-[10px] text-natural-muted/40 mt-1 font-bold">JPEG, PNG Max 5MB</span>
          </label>
        </div>
      </div>

      <AnimatePresence>
        {analyzing && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-natural-sage-soft p-6 rounded-[24px] border border-natural-sage/20 flex items-center space-x-4"
          >
            <Loader2 className="w-6 h-6 text-natural-sage animate-spin" />
            <p className="text-natural-muted font-bold text-sm tracking-wide">Yapay zeka görüntüyü analiz ediyor...</p>
          </motion.div>
        )}

        {result && !analyzing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 rounded-[32px] border ${result.isDirty ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'} shadow-sm relative overflow-hidden`}
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="flex space-x-4">
                <div className={`p-4 rounded-2xl ${result.isDirty ? 'bg-red-100' : 'bg-emerald-100'}`}>
                  {result.isDirty ? <AlertTriangle className="w-6 h-6 text-red-600" /> : <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                </div>
                <div>
                  <h4 className={`text-lg font-black tracking-tight ${result.isDirty ? 'text-red-900' : 'text-emerald-900'}`}>
                    {result.isDirty ? 'Toz ve Kir Tespit Edildi' : 'Panel Verimliliği Normal'}
                  </h4>
                  <p className={`text-sm mt-1 whitespace-pre-line font-medium leading-relaxed ${result.isDirty ? 'text-red-700' : 'text-emerald-700'}`}>
                    {result.recommendation}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-natural-muted/30 mb-1 leading-tight">Eff. Loss</p>
                <p className={`text-4xl font-black ${result.estimatedEfficiencyLoss > 15 ? 'text-red-600' : 'text-natural-text'}`}>
                   %{result.estimatedEfficiencyLoss}
                </p>
              </div>
            </div>

            {result.isDirty && (
              <div className="mt-8 pt-8 border-t border-red-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                   <span className="text-xs font-bold text-red-800 uppercase tracking-widest">Temizlik programı hazır: Jet Nozul + Fırça</span>
                </div>
                <button className="bg-natural-muted hover:bg-natural-text text-white px-8 py-3 rounded-2xl font-black text-xs shadow-lg uppercase tracking-widest transition-all active:scale-95 w-full sm:w-auto">
                  TEMİZLİĞİ BAŞLAT
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
