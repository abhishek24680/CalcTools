import { CalculatedValues } from "@/types";

export const formatNumber = (num: string | number) => {
  return Number(num).toLocaleString('en-IN');
};

export const calculateSalary = (values: {
  basicPay: string;
  fitmentFactor: string;
  fitmentFactorManual: string;
  hraCity: string;
}): CalculatedValues => {
  const basicPay = Number(values.basicPay);
  const fitmentFactor = Number(
    values.fitmentFactor === 'manual' ? values.fitmentFactorManual : values.fitmentFactor
  );
  
  const fitmentAmount = basicPay * fitmentFactor;
  
  const hraPercentage = values.hraCity === 'X' ? 0.3 : values.hraCity === 'Y' ? 0.2 : 0.1;
  const hraAmount = basicPay * hraPercentage;
  
  const totalSalary = fitmentAmount + hraAmount;

  return {
    basicPay,
    fitmentAmount,
    hraAmount,
    totalSalary
  };
};