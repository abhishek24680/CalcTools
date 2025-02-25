import { Container, Typography, Box, Paper, Grid } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>MathGage - Home</title>
        <meta
          name="description"
          content="Precision Tools for Every Calculation. Calculate your salary under the 8th Pay Commission. User-friendly calculator for government employees to estimate their revised pay and allowances."
        />
      </Head>

      {/* MathGage: Your Ultimate Calculation Companion */}
      {/* MathGage: Precision Tools for Every Calculation */}

      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{ borderRadius: 3, overflow: "hidden", p: 4, cursor: "pointer" }}
          onClick={() => router.push("/8th-pay-commission-salary-calculator")}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                fontWeight="bold"
              >
                8th Pay Commission Calculator
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                Calculate your revised salary under the 8th Pay Commission
                recommendations
              </Typography>
              <Typography paragraph>
                Our calculator helps government employees estimate their salary
                based on the latest pay commission guidelines. Simply input your
                details to get started.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Image
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Calculator illustration"
                width={100}
                height={100}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

export default Home;
