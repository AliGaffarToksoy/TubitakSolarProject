/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ScanSearch, 
  Gamepad2, 
  BookOpen, 
  Sun,
  Menu,
  X,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TelemetryData, RobotStatus } from './types';
import Dashboard from './components/Dashboard';
import ImageProcessor from './components/ImageProcessor';
import ProposalViewer from './components/ProposalViewer';
import RobotControl from './components/RobotControl';
import { cn } from './lib/utils';

type View = 'dashboard' | 'analysis' | 'controls' | 'proposal';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [telemetry, setTelemetry] = useState<TelemetryData[]>([]);
  const [robotStatus, setRobotStatus] = useState<RobotStatus>('idle');

  // Simulate incoming telemetry data
  useEffect(() => {
    const generateInitialData = (): TelemetryData[] => {
      return Array.from({ length: 20 }, (_, i) => ({
        timestamp: new Date(Date.now() - (20 - i) * 5000).toLocaleTimeString(),
        voltage: 12 + Math.random() * 2,
        current: 1.5 + Math.random() * 0.5,
        efficiency: 92 + Math.random() * 5,
        battery: 85 - (20 - i) * 0.1
      }));
    };

    setTelemetry(generateInitialData());

    const interval = setInterval(() => {
      setTelemetry(prev => {
        const last = prev[prev.length - 1];
        const newData: TelemetryData = {
          timestamp: new Date().toLocaleTimeString(),
          voltage: last.voltage + (Math.random() - 0.5) * 0.2,
          current: last.current + (Math.random() - 0.5) * 0.1,
          efficiency: last.efficiency + (Math.random() - 0.5) * 0.5,
          battery: Math.max(0, last.battery - 0.05)
        };
        return [...prev.slice(1), newData];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCommand = (cmd: string) => {
    console.log('Robot command:', cmd);
    if (cmd === 'start') setRobotStatus('cleaning');
    if (cmd === 'stop') setRobotStatus('idle');
    if (cmd === 'return') setRobotStatus('returning');
  };

  const navItems = [
    { id: 'dashboard' as View, label: 'Panel Dashboard', icon: LayoutDashboard },
    { id: 'analysis' as View, label: 'Yapay Zeka Analizi', icon: ScanSearch },
    { id: 'controls' as View, label: 'Robot Kontrolü', icon: Gamepad2 },
    { id: 'proposal' as View, label: 'Proje Detayları', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-natural-bg text-natural-text font-sans selection:bg-natural-sage-light selection:text-natural-muted">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-natural-border sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="bg-natural-sage p-1.5 rounded-lg">
            <Sun className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold tracking-tight text-natural-muted">AI CleanBot</span>
        </div>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-natural-muted hover:bg-natural-sage-soft rounded-lg">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex h-[calc(100vh-64px)] lg:h-screen overflow-hidden">
        {/* Sidebar Navigation */}
        <aside 
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-natural-border transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col",
            !isSidebarOpen && "-translate-x-full"
          )}
        >
          <div className="p-8 hidden lg:block">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-natural-sage p-2 rounded-xl shadow-lg shadow-natural-sage/20">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-natural-muted">AI CleanBot</h1>
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-natural-sage mt-1 pl-1">
              TubitakSolarProject
            </p>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl font-semibold transition-all duration-200 group text-sm",
                  activeView === item.id 
                    ? "bg-natural-muted text-white shadow-lg shadow-natural-muted/10" 
                    : "text-natural-muted/70 hover:bg-natural-sage-soft hover:text-natural-muted"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5",
                  activeView === item.id ? "text-natural-sage-light" : "text-natural-muted/40 group-hover:text-natural-muted/60"
                )} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-6">
            <div className="bg-natural-sage-soft rounded-2xl p-4 border border-natural-border/50">
              <div className="flex items-center space-x-2 text-natural-muted/40 mb-2">
                <Cpu className="w-4 h-4" />
                <span className="text-[10px] uppercase font-black tracking-widest leading-none">System Load</span>
              </div>
              <div className="w-full bg-white h-1.5 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '42%' }}
                  className="bg-natural-sage h-full"
                />
              </div>
              <p className="text-[10px] text-natural-muted/60 mt-2 font-medium">Memory Usage: 42% (Optimal)</p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-natural-bg scroll-smooth">
          <div className="p-6 lg:p-10 space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-natural-border pb-8">
              <div>
                <h2 className="text-3xl font-bold text-natural-muted tracking-tight capitalize">
                  {navItems.find(i => i.id === activeView)?.label}
                </h2>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-natural-sage-light text-natural-muted border border-natural-sage/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-natural-sage mr-1.5 animate-pulse" />
                    Otonom Sürüş: Aktif
                  </span>
                  <span className="text-natural-border text-xs">•</span>
                  <p className="text-natural-muted/60 text-xs">BT: HC-05 Connected - Kararlı</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right mr-4 hidden sm:block">
                  <p className="text-[10px] font-bold text-natural-sage uppercase tracking-widest">Global Efficiency</p>
                  <p className="text-xl font-black text-natural-text tracking-tighter">%{telemetry[telemetry.length-1]?.efficiency.toFixed(1) || '0.0'}</p>
                </div>
                <div className="bg-white p-2 px-4 rounded-xl shadow-sm border border-natural-border hover:shadow-md transition-shadow cursor-help">
                  <span className="text-xs font-bold text-natural-muted/40 tracking-tight uppercase">v1.0.4</span>
                </div>
              </div>
            </header>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {activeView === 'dashboard' && <Dashboard data={telemetry} />}
                {activeView === 'analysis' && <ImageProcessor />}
                {activeView === 'controls' && <RobotControl status={robotStatus} onCommand={handleCommand} />}
                {activeView === 'proposal' && <ProposalViewer />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
