import React from 'react';
import ReactMarkdown from 'react-markdown';
import { PROPOSAL_CONTENT } from '../constants';
import { FileText, Trophy, Target, Settings2 } from 'lucide-react';

export default function ProposalViewer() {
  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="bg-white p-10 rounded-[40px] shadow-sm border border-natural-border/50 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-natural-sage-soft rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />

        <div className="flex items-center space-x-4 mb-10 relative z-10">
          <div className="bg-natural-muted p-4 rounded-3xl shadow-lg shadow-natural-muted/10">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-natural-muted tracking-tighter">Research Proposal</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-natural-sage">TÜBİTAK 2209/A Programı</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none 
          prose-headings:text-natural-muted prose-headings:font-black prose-headings:tracking-tight
          prose-p:text-natural-muted/80 prose-p:leading-relaxed prose-p:text-base
          prose-strong:text-natural-sage prose-strong:font-black
          prose-li:text-natural-muted/70">
          <ReactMarkdown>{PROPOSAL_CONTENT}</ReactMarkdown>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-10 border-t border-natural-sage-soft relative z-10">
          <DetailCard 
            icon={<Trophy className="w-5 h-5" />}
            label="Proje Hedefi"
            value="Otonom Panel Temizliği"
          />
          <DetailCard 
            icon={<Target className="w-5 h-5" />}
            label="Yöntem"
            value="Yapay Zeka + CV"
          />
          <DetailCard 
            icon={<Settings2 className="w-5 h-5" />}
            label="Donanım"
            value="Arduino & L298N"
          />
        </div>
      </div>
    </div>
  );
}

function DetailCard({ icon, label, value }: any) {
  return (
    <div className="bg-natural-sage-soft/30 p-6 rounded-[24px] border border-natural-sage/5 group hover:bg-natural-sage-soft transition-colors text-center md:text-left">
      <div className="flex items-center justify-center md:justify-start space-x-2 text-natural-sage mb-2">
        {icon}
        <span className="text-[9px] uppercase font-black tracking-widest">{label}</span>
      </div>
      <p className="text-sm font-black text-natural-muted">{value}</p>
    </div>
  );
}
