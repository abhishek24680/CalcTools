import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Box } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          background: "linear-gradient(145deg, #e3f2fd 0%, #e8eaf6 100%)",
          py: 4,
        }}
      >
        <Component {...pageProps} />
      </Box>
      <Footer />
    </Box>
  );
}
