import {
  Box,
  Container,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { Form, Formik } from "formik";
import { ArrowRightIcon, CheckCircleIcon } from "lucide-react";
import Head from "next/head";
import React from "react";
import * as Yup from "yup";
import ResultCard from "../components/ResultCard";
import SalaryForm from "../components/SalaryForm";

interface FormValues {
  level: string;
  basicPay: string;
  fitmentFactor: string;
  fitmentFactorManual: string;
  hraCity: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});
// Info Section Component
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

const validationSchema = Yup.object({});

function EightPaySalaryCalculator() {
  const initialValues: FormValues = {
    level: "",
    basicPay: "",
    fitmentFactor: "",
    fitmentFactorManual: "",
    hraCity: "X",
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>
          8th Pay Commission Salary Calculator | Calculate Your Salary
        </title>
        <meta
          name="description"
          content="Calculate your salary under the 8th Pay Commission recommendations. Easy-to-use calculator for government employees to estimate their pay and allowances."
        />
        <meta
          name="keywords"
          content="8th pay commission, salary calculator, government salary, pay commission calculator"
        />
        <link
          rel="canonical"
          href="https://mathgage.com/8th-pay-commission-salary-calculator"
        />
      </Head>
      <Box className="app-container">
        <Container maxWidth="lg">
          <Paper
            elevation={3}
            sx={{ borderRadius: 3, overflow: "hidden", mb: 4 }}
          >
            <Box sx={{ p: 4 }}>
              <Box className="header">
                {/* <CalculatorIcon size={32} color="#1976d2" /> */}
                <Typography variant="h4" component="h1" fontWeight="bold">
                  8th Pay Commission Salary Calculator
                </Typography>
              </Box>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {(formik) => (
                  <Form>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={7}>
                        <SalaryForm formik={formik} />
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <ResultCard values={formik.values} />
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>
          </Paper>
          <Grid>
            <Paper
              elevation={3}
              sx={{ borderRadius: 3, overflow: "hidden", p: 4 }}
            >
              {/* Introduction */}
              <InfoSection title="Understanding the 8th Pay Commission">
                <Typography paragraph>
                  The 8th Pay Commission is poised to bring significant changes
                  to the salary structure of central government employees in
                  India. With its implementation expected from January 1, 2026,
                  employees are keen to understand the potential impact on their
                  earnings.
                </Typography>
              </InfoSection>

              {/* Calculator Understanding */}
              <InfoSection title="About the Calculator">
                <Typography paragraph>
                  The 8th Pay Commission Salary Calculator is a tool designed to
                  help central government employees estimate their revised
                  salaries based on the commission's recommendations. By
                  inputting current pay details, employees can project their new
                  basic pay, allowances, and overall compensation.
                </Typography>
              </InfoSection>

              {/* Benefits */}
              <InfoSection title="Benefits of Using the Calculator">
                <Box>
                  {[
                    "Accurate Projections: Employees can obtain precise estimates of their revised salaries, aiding in financial planning.",
                    "Transparency: The calculator demystifies the complex salary revision process, providing clear insights into pay structure changes.",
                    "Informed Decision-Making: With a clear understanding of potential earnings, employees can make well-informed career and personal decisions.",
                  ].map((benefit, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <CheckCircleIcon size={15} color="#1976d2" />
                      <Typography>{benefit}</Typography>
                    </Box>
                  ))}
                </Box>
              </InfoSection>

              {/* How to Use */}
              <InfoSection title="How to Use the Calculator">
                <Box>
                  {[
                    "Select Your Pay Level – Choose your current pay level from the dropdown (e.g., Level 8).",
                    "Enter Basic Pay – Input your existing basic salary (e.g., ₹62,200).",
                    "Choose or Enter Fitment Factor – You can select from 1.86 to 2.86 or manually type your desired fitment factor.",
                    "Select HRA City Class – Choose X, Y, or Z based on your city category:",
                  ].map((step, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <ArrowRightIcon size={15} color="#1976d2" />
                      <Typography>{step}</Typography>
                    </Box>
                  ))}
                  <Box sx={{ pl: 4, mb: 2 }}>
                    <Typography>• X Class Cities → 30% of Basic Pay</Typography>
                    <Typography>• Y Class Cities → 20% of Basic Pay</Typography>
                    <Typography>• Z Class Cities → 10% of Basic Pay</Typography>
                  </Box>
                </Box>
              </InfoSection>

              <InfoSection title="How the Calculation Works">
                <Box>
                  <Typography variant="subtitle1" gutterBottom fontWeight="500">
                    1. Fitment Calculation
                  </Typography>
                  <Typography paragraph>
                    The fitment amount is calculated as: Fitment Amount = Basic
                    Pay × Fitment Factor
                  </Typography>
                  <Typography paragraph>
                    For example, if the Basic Pay = ₹62,200 and Fitment Factor =
                    2.10, then: ₹62,200 × 2.10 = ₹1,30,620
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    fontWeight="500"
                    sx={{ mt: 3 }}
                  >
                    2. HRA Calculation
                  </Typography>
                  <Typography paragraph>
                    The House Rent Allowance (HRA) is based on the city
                    classification: HRA Amount = Basic Pay × HRA Percentage
                  </Typography>
                  <Box sx={{ ml: 2, mb: 2 }}>
                    <Typography>
                      • X Class City (30%) → ₹62,200 × 30% = ₹18,660
                    </Typography>
                    <Typography>
                      • Y Class City (20%) → ₹62,200 × 20% = ₹12,440
                    </Typography>
                    <Typography>
                      • Z Class City (10%) → ₹62,200 × 10% = ₹6,220
                    </Typography>
                  </Box>

                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    fontWeight="500"
                    sx={{ mt: 3 }}
                  >
                    3. Total Salary Calculation
                  </Typography>
                  <Typography paragraph>
                    Total Salary = Fitment Amount + HRA Amount
                  </Typography>
                  <Typography>
                    For X Class City: ₹1,30,620 + ₹18,660 = ₹1,49,280
                  </Typography>
                </Box>
              </InfoSection>

              {/* Conclusion */}
              <InfoSection title="Looking Ahead">
                <Typography paragraph>
                  The 8th Pay Commission Salary Calculator is a game-changer for
                  central government employees, offering a clear and structured
                  approach to estimating revised salaries under the new pay
                  matrix. As we move closer to 2026, using this tool can help
                  employees stay informed, plan their finances wisely, and
                  prepare for their future salary benefits.
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  fontWeight="600"
                >
                  Stay tuned for official updates on the 8th Pay Commission!
                </Typography>
              </InfoSection>
            </Paper>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default EightPaySalaryCalculator;
