import {
  AppBar,
  Button,
  Container,
  Stack,
  Toolbar,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { CalculatorIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Stack direction="row" spacing={2}>
              <Link
                href="/privacy"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="body2" color="text.secondary">
                  Privacy Policy
                </Typography>
              </Link>
              <Link
                href="/contact"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="body2" color="text.secondary">
                  Contact Us
                </Typography>
              </Link>
            </Stack>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} MathGage. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
