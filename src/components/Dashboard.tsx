import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Battery, Zap, Activity, TrendingDown } from 'lucide-react';
import { TelemetryData } from '../types';

interface DashboardProps {
  data: TelemetryData[];
}

export default function Dashboard({ data }: DashboardProps) {
  const currentStatus = data[data.length - 1];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<Zap className="w-5 h-5 text-natural-muted" />}
          label="Gerilim (Voltage)"
          value={`${currentStatus?.voltage.toFixed(1)}V`}
          subValue="Anlık panel çıkışı"
        />
        <StatCard 
          icon={<Activity className="w-5 h-5 text-natural-sage" />}
          label="Akım (Current)"
          value={`${currentStatus?.current.toFixed(2)}A`}
          subValue="Anlık tüketim/üretim"
        />
        <StatCard 
          icon={<Battery className="w-5 h-5 text-natural-sage" />}
          label="Batarya (Battery)"
          value={`${currentStatus?.battery}%`}
          subValue={currentStatus?.battery < 20 ? "Düşük Şarj!" : "Normal"}
          valueColor={currentStatus?.battery < 20 ? "text-red-500" : "text-natural-sage"}
        />
        <StatCard 
          icon={<TrendingDown className="w-5 h-5 text-natural-muted" />}
          label="Verimlilik (Efficiency)"
          value={`%${currentStatus?.efficiency.toFixed(1)}`}
          subValue="Tahmini çıkış oranı"
        />
      </div>

      {/* Charts Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-natural-sage-soft">
          <h3 className="text-sm font-bold mb-6 text-natural-muted uppercase tracking-widest">Güç Çıkışı ve Verimlilik</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8daa91" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8daa91" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef1ed" />
                <XAxis dataKey="timestamp" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff' }}
                />
                <Area type="monotone" dataKey="efficiency" stroke="#8daa91" strokeWidth={3} fillOpacity={1} fill="url(#colorEff)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-natural-sage-soft">
          <h3 className="text-sm font-bold mb-6 text-natural-muted uppercase tracking-widest">Gerilim ve Akım Takibi</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef1ed" />
                <XAxis dataKey="timestamp" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff' }}
                />
                <Line type="monotone" dataKey="voltage" stroke="#4f6d7a" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="current" stroke="#8daa91" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, subValue, valueColor = "text-natural-text" }: any) {
  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-natural-sage-soft flex items-start space-x-4">
      <div className="bg-natural-sage-soft p-3 rounded-2xl">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-natural-muted/60 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className={`text-2xl font-bold tracking-tight ${valueColor}`}>{value}</p>
        <p className="text-[10px] text-natural-sage font-medium mt-1 uppercase tracking-wide">{subValue}</p>
      </div>
    </div>
  );
}
