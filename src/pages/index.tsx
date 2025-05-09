import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import Link from "next/link";
import {
  Calculator as CalculatorIcon,
  ArrowRight as ArrowRightIcon,
} from "lucide-react";
import Head from "next/head";

function FeatureCard({
  title,
  description,
  icon,
  link,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        height: "100%",
        borderRadius: 3,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <Box sx={{ color: "primary.main", mb: 2 }}>{icon}</Box>
      <Typography variant="h6" gutterBottom fontWeight="600">
        {title}
      </Typography>
      <Typography color="text.secondary" paragraph>
        {description}
      </Typography>
      <Button
        component={Link}
        href={link}
        variant="outlined"
        color="primary"
        endIcon={<ArrowRightIcon size={16} />}
        sx={{ mt: 2 }}
      >
        Calculate Now
      </Button>
    </Paper>
  );
}

function Home() {
  return (
    <>
      <Head>
        <title>Pay Commission Calculator - Calculate Your Salary</title>
        <meta
          name="description"
          content="Calculate your salary under both 7th and 8th Pay Commission recommendations. User-friendly calculator for government employees."
        />
      </Head>

      <Box
        sx={{
          background: "linear-gradient(145deg, #e3f2fd 0%, #bbdefb 100%)",
          py: { xs: 6, md: 12 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  background:
                    "linear-gradient(145deg, #1976d2 30%, #1565c0 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Pay Commission Calculator
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ mb: 4, fontWeight: 500 }}
              >
                Calculate your revised salary under the latest pay commission
                recommendations
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  component={Link}
                  href="/8th-pay-commission-salary-calculator"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1.1rem",
                  }}
                >
                  8th Pay Calculator
                </Button>
                <Button
                  component={Link}
                  href="/7th-pay-commission-salary-calculator"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1.1rem",
                  }}
                >
                  7th Pay Calculator
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Calculator illustration"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 4,
                  boxShadow: 4,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 6,
          }}
        >
          Choose Your Calculator
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FeatureCard
              title="8th Pay Commission Calculator"
              description="Calculate your revised salary under the upcoming 8th Pay Commission recommendations. Get accurate estimates of your new pay structure."
              icon={<CalculatorIcon size={32} />}
              link="/8th-pay-commission-salary-calculator"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureCard
              title="7th Pay Commission Calculator"
              description="Calculate your current salary under the 7th Pay Commission including all allowances and deductions as per the latest guidelines."
              icon={<CalculatorIcon size={32} />}
              link="/7th-pay-commission-salary-calculator"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom fontWeight="600">
            Why Use Our Calculator?
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 800, mx: "auto" }}>
            Our calculator provides accurate estimates based on the latest pay
            commission guidelines. It takes into account various factors like
            basic pay, allowances, and deductions to give you a comprehensive
            view of your salary structure.
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default Home;
