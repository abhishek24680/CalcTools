export interface FormValues {
  level: string;
  basicPay: string;
  fitmentFactor: string;
  fitmentFactorManual: string;
  hraCity: string;
}

export interface CalculatedValues {
  basicPay: number;
  fitmentAmount: number;
  hraAmount: number;
  totalSalary: number;
}