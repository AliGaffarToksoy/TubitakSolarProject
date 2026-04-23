export interface TelemetryData {
  timestamp: string;
  voltage: number;
  current: number;
  efficiency: number;
  battery: number;
}

export type RobotStatus = 'idle' | 'cleaning' | 'returning' | 'charging' | 'error';

export interface AnalysisResult {
  isDirty: boolean;
  dirtDensity: number; // 0-100
  recommendation: string;
  estimatedEfficiencyLoss: number;
}
