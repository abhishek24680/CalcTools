import React from "react";
import Head from "next/head";
import { Container, Typography, Paper, Box } from "@mui/material";

function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - MathGage</title>
        <meta
          name="description"
          content="Privacy policy for the MathGage Calculator Application. Learn how we handle and protect your information."
        />
        <link rel="canonical" href="https://mathgage.com/privacy" />
      </Head>

      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden", p: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Privacy Policy
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              1. Information We Collect
            </Typography>
            <Typography paragraph>
              We do not collect or store any personal information. All
              calculations are performed locally in your browser.
            </Typography>

            <Typography variant="h6" gutterBottom>
              2. How We Use Your Information
            </Typography>
            <Typography paragraph>
              Since we don't collect any information, there is no usage or
              sharing of data. Your inputs are only used to calculate your
              salary estimates.
            </Typography>

            <Typography variant="h6" gutterBottom>
              3. Contact Us
            </Typography>
            <Typography paragraph>
              If you have any questions about this Privacy Policy, please
              contact us through the Contact page.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Privacy;
