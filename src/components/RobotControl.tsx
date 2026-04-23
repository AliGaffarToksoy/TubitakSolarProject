import React from 'react';
import { 
  Play, 
  Square, 
  RotateCcw, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { RobotStatus } from '../types';

interface RobotControlProps {
  status: RobotStatus;
  onCommand: (cmd: string) => void;
}

export default function RobotControl({ status, onCommand }: RobotControlProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {/* Status Card */}
      <div className="bg-natural-sage text-white p-8 rounded-[32px] col-span-1 shadow-lg flex flex-col justify-between border border-natural-sage/20">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-black tracking-tight uppercase">AI CleanBot Health</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 bg-white/10 rounded-[24px] border border-white/10 hover:bg-white/15 transition-colors">
              <span className="text-white/70 text-xs font-bold uppercase tracking-widest">Mode</span>
              <span className="bg-white text-natural-sage px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                Otonom
              </span>
            </div>
            
            <div className="flex items-center justify-between p-5 bg-white/10 rounded-[24px] border border-white/10">
              <span className="text-white/70 text-xs font-bold uppercase tracking-widest">Activity</span>
              <span className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${status === 'cleaning' ? 'bg-green-400 animate-pulse' : 'bg-white/30'}`} />
                <span className="font-bold text-sm capitalize">{status}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 p-5 bg-natural-muted/20 rounded-[24px] border border-white/5">
          <div className="flex items-center space-x-2 text-white/50 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] uppercase font-black tracking-widest">Safe Drive active</span>
          </div>
          <p className="text-[11px] text-white/60 font-medium leading-relaxed">
            Robot, yüzey kenarlarını tespit ederek kaza riskini minimuma indirir. (IR + Görüntü İşleme)
          </p>
        </div>
      </div>

      {/* Manual Control Grid */}
      <div className="bg-white p-8 rounded-[32px] col-span-1 lg:col-span-2 shadow-sm border border-natural-sage-soft flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-4 w-full">
          <h3 className="text-sm font-black text-natural-muted mb-8 uppercase tracking-widest">Robot Manuel Komutları</h3>
          <button 
            onClick={() => onCommand('start')}
            className="w-full py-5 rounded-3xl bg-natural-sage-soft hover:bg-natural-sage hover:text-white transition-all flex items-center justify-center space-x-3 group border border-natural-sage/10"
          >
            <Play className="w-5 h-5 group-hover:fill-white" />
            <span className="font-black text-xs uppercase tracking-widest">SİSTEMİ BAŞLAT</span>
          </button>
          
          <button 
            onClick={() => onCommand('stop')}
            className="w-full py-5 rounded-3xl bg-red-50 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center space-x-3 group border border-red-200/50"
          >
            <Square className="w-5 h-5 group-hover:fill-white" />
            <span className="font-black text-xs uppercase tracking-widest">ACİL DURDUR</span>
          </button>

          <button 
             onClick={() => onCommand('return')}
            className="w-full py-5 rounded-3xl bg-natural-sage-soft hover:bg-natural-muted hover:text-white transition-all flex items-center justify-center space-x-3 group border border-natural-muted/10 text-natural-muted"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="font-black text-xs uppercase tracking-widest text-inherit">DOCKING MODE</span>
          </button>
        </div>

        <div className="relative p-10 bg-natural-sage-soft rounded-[48px] border border-natural-border shadow-inner shrink-0 scale-110 lg:scale-100">
          <div className="grid grid-cols-3 gap-5">
            <div />
            <ControlButton icon={<ChevronUp />} onClick={() => onCommand('up')} />
            <div />
            <ControlButton icon={<ChevronLeft />} onClick={() => onCommand('left')} />
            <div className="bg-white w-14 h-14 rounded-2xl border-2 border-natural-border flex items-center justify-center shadow-lg">
              <div className="w-5 h-5 bg-natural-sage/20 rounded-full border-2 border-natural-sage/40" />
            </div>
            <ControlButton icon={<ChevronRight />} onClick={() => onCommand('right')} />
            <div />
            <ControlButton icon={<ChevronDown />} onClick={() => onCommand('down')} />
            <div />
          </div>
          <p className="absolute -bottom-12 left-0 right-0 text-center text-[9px] text-natural-muted/40 font-black uppercase tracking-[0.2em] leading-none">
            Manual Override Link
          </p>
        </div>
      </div>
    </div>
  );
}

function ControlButton({ icon, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-md active:shadow-inner active:scale-95 transition-all text-natural-muted/50 hover:text-natural-sage border border-natural-border/50 hover:border-natural-sage focus:outline-none"
    >
      {icon}
    </button>
  );
}
