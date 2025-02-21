import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { FormValues } from "../types";
import { formatNumber } from "../utils";
import { calculateSalary } from "../utils";

interface ResultCardProps {
  values: FormValues;
}

const ResultCard = ({ values }: ResultCardProps) => {
  const calculations =
    values.basicPay && values.fitmentFactor ? calculateSalary(values) : null;

  return (
    <Card
      sx={{
        height: "100%",
        background: "linear-gradient(145deg, #1976d2 0%, #303f9f 100%)",
        color: "white",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Salary Details
        </Typography>
        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
          <Box className="result-item">
            <Typography color="rgba(255,255,255,0.8)">Level</Typography>
            <Typography fontWeight="medium">{values.level || "-"}</Typography>
          </Box>
          <Box className="result-item">
            <Typography color="rgba(255,255,255,0.8)">Basic Pay</Typography>
            <Typography fontWeight="medium">
              {values.basicPay ? `₹${formatNumber(values.basicPay)}` : "-"}
            </Typography>
          </Box>
          <Box className="result-item">
            <Typography color="rgba(255,255,255,0.8)">
              Fitment Factor
            </Typography>
            <Typography fontWeight="medium">
              {values.fitmentFactor === "manual"
                ? values.fitmentFactorManual || "-"
                : values.fitmentFactor || "-"}
            </Typography>
          </Box>
          <Box className="result-item">
            <Typography color="rgba(255,255,255,0.8)">
              HRA City Class
            </Typography>
            <Typography fontWeight="medium">{values.hraCity}</Typography>
          </Box>
          {calculations && (
            <>
              <Box className="result-item">
                <Typography color="rgba(255,255,255,0.8)">
                  Fitment Amount
                </Typography>
                <Typography fontWeight="medium">
                  ₹{formatNumber(calculations.fitmentAmount)}
                </Typography>
              </Box>
              <Box className="result-item">
                <Typography color="rgba(255,255,255,0.8)">
                  HRA Amount
                </Typography>
                <Typography fontWeight="medium">
                  ₹{formatNumber(calculations.hraAmount)}
                </Typography>
              </Box>
              <Box className="result-item">
                <Typography color="rgba(255,255,255,0.8)">
                  Total Salary
                </Typography>
                <Typography fontWeight="medium" fontSize="1.2em">
                  ₹{formatNumber(calculations.totalSalary)}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
