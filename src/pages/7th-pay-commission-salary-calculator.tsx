import React, { useState } from "react";
import Head from "next/head";
import {
  Container,
  Paper,
  Typography,
  Grid,
  MenuItem,
  TextField,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  PlusCircle as PlusCircleIcon,
  Trash2 as TrashIcon,
  ChevronDown as ChevronDownIcon,
  RefreshCw as RefreshIcon,
} from "lucide-react";
import { levels, basicPayRanges } from "../constants";
import { formatNumber } from "../utils";
import { ArrowRightIcon, CheckCircleIcon } from "lucide-react";

interface AdditionalAllowance {
  id: string;
  name: string;
  amount: string;
}

const DA_PERCENTAGE = 55;

const getCGHSAmount = (level: string): number => {
  const levelNum = parseInt(level.replace("L", ""));
  if (levelNum >= 12) return 1000;
  if (levelNum >= 7) return 650;
  if (levelNum === 6) return 450;
  return 250;
};

const calculateIncomeTax = (annualIncome: number): number => {
  // Standard Deduction
  const standardDeduction = 75000;
  const taxableIncome = annualIncome - standardDeduction;

  // No tax if taxable income is ₹12,75,000 or less
  if (taxableIncome <= 1275000) return 0;

  let tax = 0;
  let remainingIncome = taxableIncome;

  // Apply tax slabs from lowest to highest
  if (remainingIncome > 2400000) {
    tax += (remainingIncome - 2400000) * 0.3;
    remainingIncome = 2400000;
  }
  if (remainingIncome > 2000000) {
    tax += (remainingIncome - 2000000) * 0.25;
    remainingIncome = 2000000;
  }
  if (remainingIncome > 1600000) {
    tax += (remainingIncome - 1600000) * 0.2;
    remainingIncome = 1600000;
  }
  if (remainingIncome > 1200000) {
    tax += (remainingIncome - 1200000) * 0.15;
    remainingIncome = 1200000;
  }
  if (remainingIncome > 800000) {
    tax += (remainingIncome - 800000) * 0.1;
    remainingIncome = 800000;
  }
  if (remainingIncome > 400000) {
    tax += (remainingIncome - 400000) * 0.05;
  }

  // Add 4% Health & Education Cess
  tax += tax * 0.04;

  // Return Monthly Tax (Rounded)
  return Math.round(tax / 12);
};

const getTAAmount = (level: string, cityType: string): number => {
  if (cityType === "no_ta") return 0;

  const levelNum = parseInt(level.replace("L", ""));
  let baseTA = 0;

  if (levelNum >= 9) {
    baseTA = cityType === "higher_tpta" ? 7200 : 3600;
  } else if (levelNum >= 3 && levelNum <= 8) {
    baseTA = cityType === "higher_tpta" ? 3600 : 1800;
  } else {
    baseTA = cityType === "higher_tpta" ? 1350 : 900;
  }

  return baseTA + (baseTA * DA_PERCENTAGE) / 100;
};

function SalaryDetailsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ChevronDownIcon size={20} />}
        sx={{
          backgroundColor: "rgba(255,255,255,0.05)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {children}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

function ResultItem({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        py: 0.5,
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        "&:last-child": {
          borderBottom: "none",
        },
      }}
    >
      <Typography>{label}</Typography>
      <Typography fontWeight={bold ? "medium" : "normal"}>{value}</Typography>
    </Box>
  );
}

const InfoSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ mb: 4 }}>
    <Typography
      variant="h5"
      gutterBottom
      fontWeight="600"
      color="primary"
      sx={{ display: "flex", alignItems: "center", gap: 1 }}
    >
      {title}
    </Typography>
    <Box sx={{ pl: 4 }}>{children}</Box>
  </Box>
);

const initialFormState = {
  level: "",
  basicPay: "",
  hraCity: "X",
  taCity: "no_ta",
};

function SeventhPayCalculator() {
  const [values, setValues] = useState(initialFormState);

  const [additionalAllowances, setAdditionalAllowances] = useState<
    AdditionalAllowance[]
  >([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addAllowance = () => {
    setAdditionalAllowances((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "", amount: "" },
    ]);
  };

  const removeAllowance = (id: string) => {
    setAdditionalAllowances((prev) =>
      prev.filter((allowance) => allowance.id !== id)
    );
  };

  const updateAllowance = (
    id: string,
    field: "name" | "amount",
    value: string
  ) => {
    setAdditionalAllowances((prev) =>
      prev.map((allowance) =>
        allowance.id === id ? { ...allowance, [field]: value } : allowance
      )
    );
  };

  const calculateSalary = () => {
    if (!values.basicPay) return null;

    const basicPay = Number(values.basicPay);
    const daAmount = basicPay * (DA_PERCENTAGE / 100);

    const hraPercentage =
      values.hraCity === "X" ? 0.3 : values.hraCity === "Y" ? 0.2 : 0.1;
    const hraAmount = basicPay * hraPercentage;
    const taAmount = getTAAmount(values.level, values.taCity);
    const additionalAmount = additionalAllowances.reduce(
      (sum, allowance) => sum + (Number(allowance.amount) || 0),
      0
    );

    const grossSalary =
      basicPay + daAmount + hraAmount + taAmount + additionalAmount;

    // Deductions
    const npsAmount = (basicPay + daAmount) * 0.1;
    const cghsAmount = getCGHSAmount(values.level);
    const incomeTaxAmount = calculateIncomeTax(grossSalary * 12);

    const totalDeductions = npsAmount + cghsAmount + incomeTaxAmount;
    const netSalary = grossSalary - totalDeductions;

    return {
      basicPay,
      daAmount,
      hraAmount,
      taAmount,
      additionalAmount,
      grossSalary,
      npsAmount,
      cghsAmount,
      incomeTaxAmount,
      totalDeductions,
      netSalary,
    };
  };

  const calculations = calculateSalary();

  const resetForm = () => {
    setValues(initialFormState);
    setAdditionalAllowances([]);
  };

  return (
    <>
      <Head>
        <title>7th Pay Commission Calculator | Calculate Your Salary</title>
        <meta
          name="description"
          content="Calculate your salary under the 7th Pay Commission recommendations."
        />
      </Head>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper
              elevation={3}
              sx={{ borderRadius: 3, overflow: "hidden", p: 4 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 4,
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    color: "#1976d2",
                  }}
                >
                  7th Pay Commission Calculator
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<RefreshIcon size={18} />}
                  onClick={resetForm}
                >
                  Reset
                </Button>
              </Box>

              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}
              >
                <TextField
                  select
                  fullWidth
                  label="Level"
                  name="level"
                  value={values.level}
                  onChange={handleChange}
                >
                  {levels.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  fullWidth
                  label="Basic Pay"
                  name="basicPay"
                  value={values.basicPay}
                  onChange={handleChange}
                  disabled={!values.level}
                >
                  {values.level &&
                    basicPayRanges[
                      values.level as keyof typeof basicPayRanges
                    ].map((pay) => (
                      <MenuItem key={pay} value={pay}>
                        ₹{formatNumber(pay)}
                      </MenuItem>
                    ))}
                </TextField>

                <TextField
                  select
                  fullWidth
                  label="HRA City Class"
                  name="hraCity"
                  value={values.hraCity}
                  onChange={handleChange}
                >
                  <MenuItem value="X">X (30%)</MenuItem>
                  <MenuItem value="Y">Y (20%)</MenuItem>
                  <MenuItem value="Z">Z (10%)</MenuItem>
                </TextField>

                <TextField
                  select
                  fullWidth
                  label="Transport Allowance"
                  name="taCity"
                  value={values.taCity}
                  onChange={handleChange}
                >
                  <MenuItem value="no_ta">No TA</MenuItem>
                  <MenuItem value="higher_tpta">Higher TPTA Cities</MenuItem>
                  <MenuItem value="other_cities">Other Cities</MenuItem>
                </TextField>

                <Typography
                  sx={{
                    color: "#1976d2",
                    fontWeight: 500,
                    backgroundColor: "#e3f2fd",
                    p: 2,
                    borderRadius: 1,
                  }}
                >
                  Dearness Allowance (DA): {DA_PERCENTAGE}%
                </Typography>

                {additionalAllowances.map((allowance) => (
                  <Box
                    key={allowance.id}
                    sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
                  >
                    <TextField
                      label="Allowance Name"
                      value={allowance.name}
                      onChange={(e) =>
                        updateAllowance(allowance.id, "name", e.target.value)
                      }
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Amount"
                      type="number"
                      value={allowance.amount}
                      onChange={(e) =>
                        updateAllowance(allowance.id, "amount", e.target.value)
                      }
                      sx={{ flex: 1 }}
                    />
                    <IconButton
                      onClick={() => removeAllowance(allowance.id)}
                      color="error"
                      sx={{ mt: 1 }}
                    >
                      <TrashIcon size={20} />
                    </IconButton>
                  </Box>
                ))}

                <Button
                  startIcon={<PlusCircleIcon size={20} />}
                  onClick={addAllowance}
                  variant="outlined"
                  color="primary"
                >
                  Add Allowance
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card
              sx={{
                height: "100%",
                background: "linear-gradient(145deg, #1976d2 0%, #303f9f 100%)",
                color: "white",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Salary Details
                </Typography>

                {calculations && (
                  <Box sx={{ mt: 3 }}>
                    <ResultItem label="Level" value={values.level || "-"} />

                    <Box sx={{ mt: 3 }}>
                      <SalaryDetailsSection title="Basic Details">
                        <ResultItem
                          label="Basic Pay"
                          value={`₹${formatNumber(calculations.basicPay)}`}
                        />
                        <ResultItem
                          label={`DA (${DA_PERCENTAGE}%)`}
                          value={`₹${formatNumber(calculations.daAmount)}`}
                        />
                      </SalaryDetailsSection>

                      <SalaryDetailsSection title="Allowances">
                        <ResultItem
                          label="HRA Amount"
                          value={`₹${formatNumber(calculations.hraAmount)}`}
                        />
                        <ResultItem
                          label="Transport Allowance (with DA)"
                          value={`₹${formatNumber(calculations.taAmount)}`}
                        />
                        {calculations.additionalAmount > 0 && (
                          <ResultItem
                            label="Additional Allowances"
                            value={`₹${formatNumber(
                              calculations.additionalAmount
                            )}`}
                          />
                        )}
                      </SalaryDetailsSection>

                      <SalaryDetailsSection title="Deductions">
                        <ResultItem
                          label="NPS (10% of Basic + DA)"
                          value={`₹${formatNumber(calculations.npsAmount)}`}
                        />
                        <ResultItem
                          label="CGHS Contribution"
                          value={`₹${formatNumber(calculations.cghsAmount)}`}
                        />
                        <ResultItem
                          label="Income Tax (New Regime)"
                          value={`₹${formatNumber(
                            calculations.incomeTaxAmount
                          )}`}
                        />
                        <ResultItem
                          label="Total Deductions"
                          value={`₹${formatNumber(
                            calculations.totalDeductions
                          )}`}
                          bold
                        />
                      </SalaryDetailsSection>

                      <Box
                        sx={{
                          mt: 3,
                          p: 2,
                          bgcolor: "rgba(255,255,255,0.1)",
                          borderRadius: 1,
                        }}
                      >
                        <ResultItem
                          label="Gross Salary"
                          value={`₹${formatNumber(calculations.grossSalary)}`}
                          bold
                        />
                        <ResultItem
                          label="Net Salary"
                          value={`₹${formatNumber(calculations.netSalary)}`}
                          bold
                        />
                      </Box>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid>
          <Paper
            elevation={3}
            sx={{ borderRadius: 3, overflow: "hidden", p: 4, mt: 8 }}
          >
            {/* Introduction */}
            <InfoSection title="Introduction to 7th Pay Commission Calculator">
              <Typography paragraph>
                The 7th Pay Commission was implemented by the Government of
                India to determine the pay structure for central government
                employees. The new system takes into account various allowances,
                deductions, and contributions. The 7th Pay Calculator helps
                employees calculate their monthly pay based on their pay level,
                allowances, and other factors. Here, we’ll explain the key
                components such as deductions, employer contributions,
                allowances, and city classification to give you a better
                understanding of how your salary is calculated.
              </Typography>
            </InfoSection>

            {/* Deductions */}
            <InfoSection title="Key Deductions">
              <Box>
                <Typography variant="subtitle1" gutterBottom fontWeight="600">
                  NPS Deduction:
                </Typography>
                <Typography paragraph>
                  The National Pension Scheme (NPS) deduction is a significant
                  part of the salary structure. For government employees, 10% of
                  their Basic Pay and Dearness Allowance (DA) is deducted
                  towards their NPS account. This deducted amount is then
                  contributed to the employee's pension account, ensuring
                  long-term retirement benefits.
                </Typography>

                <Typography variant="subtitle1" gutterBottom fontWeight="600">
                  CGHS Contribution:
                </Typography>
                <Typography paragraph>
                  The Central Government Health Scheme (CGHS) provides
                  healthcare benefits to government employees. The contribution
                  varies according to the pay level of the employee:
                </Typography>
                <Box sx={{ pl: 4, mb: 2 }}>
                  <Typography>• Level 1-5: ₹250 per month</Typography>
                  <Typography>• Level 6: ₹450 per month</Typography>
                  <Typography>• Level 7-11: ₹650 per month</Typography>
                  <Typography>• Level 12 and above: ₹1000 per month</Typography>
                </Box>

                <Typography variant="subtitle1" gutterBottom fontWeight="600">
                  Employer NPS Contribution:
                </Typography>
                <Typography paragraph>
                  The employer also contributes to the NPS, adding 14% of the
                  employee's Basic Pay and DA to the employee's NPS account.
                  This employer contribution enhances the employee’s retirement
                  fund and provides financial security in the future.
                </Typography>
              </Box>
            </InfoSection>

            {/* Allowances */}
            <InfoSection title="Allowances">
              <Typography variant="subtitle1" gutterBottom fontWeight="600">
                Hospital Patient Care Allowance (HPCA) / Patient Care Allowance:
                (PCA)
              </Typography>
              <Typography paragraph>
                Employees working in healthcare-related departments are entitled
                to HPCA/PCA, which is determined by their pay level:
              </Typography>
              <Box sx={{ pl: 4, mb: 2 }}>
                <Typography>• Level 8 and below: ₹4100</Typography>
                <Typography>• Level 9 and above: ₹5300</Typography>
              </Box>

              <Typography variant="subtitle1" gutterBottom fontWeight="600">
                Non-Practising Allowance (NPA):
              </Typography>
              <Typography paragraph>
                Medical professionals who are not practicing can receive a
                Non-Practising Allowance (NPA) of 20% of their Basic Pay.
              </Typography>
            </InfoSection>

            {/* HRA City Classification */}
            <InfoSection title="HRA City Classification">
              <Typography paragraph>
                The House Rent Allowance (HRA) is calculated based on the city
                where the employee is posted. The cities are classified into
                three categories:
              </Typography>

              <Typography variant="subtitle1" gutterBottom fontWeight="600">
                X City (30% of Basic Pay)
              </Typography>
              <Typography paragraph>
                Cities with a population of 50 lakhs and above, such as
                Ahmedabad, Bengaluru, Chennai, Delhi, Hyderabad, Kolkata,
                Mumbai, and Pune, are classified under X city.
              </Typography>

              <Typography variant="subtitle1" gutterBottom fontWeight="600">
                Y City (20% of Basic Pay)
              </Typography>
              <Typography paragraph>
                Cities with a population between 5 lakhs and 50 lakhs, like
                Agra, Bhopal, Jaipur, Lucknow, and Nagpur, are classified under
                Y city.
              </Typography>

              <Typography variant="subtitle1" gutterBottom fontWeight="600">
                Z City (10% of Basic Pay)
              </Typography>
              <Typography paragraph>
                Cities with a population below 5 lakhs fall under the Z city
                category, where the HRA is 10% of the Basic Pay.
              </Typography>
            </InfoSection>

            {/* Transport Allowance (TA) */}
            <InfoSection title="Transport Allowance (TA) Classification">
              <Typography paragraph>
                The Transport Allowance (TA) varies based on the pay level and
                city classification. Employees posted in TPTA cities get higher
                allowances than those posted in other cities.
              </Typography>
              <Typography variant="subtitle1" gutterBottom fontWeight="600">
                For Employees in Pay Level 9 and Above:
              </Typography>
              <Box sx={{ ml: 4, mb: 2 }}>
                <Typography>• TPTA Cities: ₹7200 + DA</Typography>
                <Typography>• Other Cities: ₹3600 + DA</Typography>
              </Box>

              <Typography variant="subtitle1" gutterBottom fontWeight="600">
                For Employees in Pay Levels 3 to 8:
              </Typography>
              <Box sx={{ ml: 4, mb: 2 }}>
                <Typography>• TPTA Cities: ₹3600 + DA</Typography>
                <Typography>• Other Cities: ₹1800 + DA</Typography>
              </Box>

              <Typography variant="subtitle1" gutterBottom fontWeight="600">
                For Employees in Pay Levels 1 and 2:
              </Typography>
              <Box sx={{ ml: 4, mb: 2 }}>
                <Typography>• TPTA Cities: ₹1350 + DA</Typography>
                <Typography>• Other Cities: ₹900 + DA</Typography>
              </Box>
            </InfoSection>

            {/* Conclusion */}
            <InfoSection title="Conclusion">
              <Typography paragraph>
                The 7th Pay Commission salary structure simplifies the
                calculation of various components such as allowances,
                deductions, and contributions. By understanding the various
                factors, employees can better plan their finances and understand
                how their salaries are calculated. Using the 7th Pay Calculator
                ensures a smooth and transparent approach to salary estimation.
              </Typography>
            </InfoSection>
          </Paper>
        </Grid>
      </Container>
    </>
  );
}

export default SeventhPayCalculator;
