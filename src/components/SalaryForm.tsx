import React from "react";
import { Box, TextField, MenuItem, Typography, Button } from "@mui/material";
import { FormikProps } from "formik";
import { FormValues } from "../types";
import { levels, basicPayRanges, fitmentFactors } from "../constants";
import { formatNumber } from "../utils";
import { RefreshCwIcon } from "lucide-react";

interface SalaryFormProps {
  formik: FormikProps<FormValues>;
}

const SalaryForm = ({ formik }: SalaryFormProps) => {
  const { values, errors, touched, handleChange, setFieldValue, resetForm } =
    formik;

  return (
    <Box className="form-container">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Your Input
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<RefreshCwIcon size={18} />}
          onClick={() => resetForm()}
        >
          Reset
        </Button>
      </Box>

      <TextField
        select
        fullWidth
        label="Level"
        name="level"
        value={values.level}
        onChange={(e) => {
          handleChange(e);
          setFieldValue("basicPay", "");
        }}
        error={touched.level && Boolean(errors.level)}
        helperText={touched.level && errors.level}
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
        error={touched.basicPay && Boolean(errors.basicPay)}
        helperText={touched.basicPay && errors.basicPay}
        disabled={!values.level}
      >
        {values.level &&
          basicPayRanges[values.level as keyof typeof basicPayRanges].map(
            (pay) => (
              <MenuItem key={pay} value={pay}>
                ₹{formatNumber(pay)}
              </MenuItem>
            )
          )}
      </TextField>

      <TextField
        select
        fullWidth
        label="Fitment Factor"
        name="fitmentFactor"
        value={values.fitmentFactor}
        onChange={(e) => {
          handleChange(e);
          if (e.target.value !== "manual") {
            setFieldValue("fitmentFactorManual", "");
          }
        }}
        error={touched.fitmentFactor && Boolean(errors.fitmentFactor)}
        helperText={touched.fitmentFactor && errors.fitmentFactor}
      >
        {fitmentFactors.map((factor) => (
          <MenuItem key={factor.value} value={factor.value}>
            {factor.label}
          </MenuItem>
        ))}
      </TextField>

      {values.fitmentFactor === "manual" && (
        <TextField
          fullWidth
          label="Enter Fitment Factor"
          name="fitmentFactorManual"
          type="number"
          inputProps={{ step: "0.01" }}
          value={values.fitmentFactorManual}
          onChange={handleChange}
          error={
            touched.fitmentFactorManual && Boolean(errors.fitmentFactorManual)
          }
          helperText={touched.fitmentFactorManual && errors.fitmentFactorManual}
        />
      )}

      <TextField
        select
        fullWidth
        label="HRA City Class"
        name="hraCity"
        value={values.hraCity}
        onChange={handleChange}
        error={touched.hraCity && Boolean(errors.hraCity)}
        helperText={touched.hraCity && errors.hraCity}
      >
        <MenuItem value="X">X</MenuItem>
        <MenuItem value="Y">Y</MenuItem>
        <MenuItem value="Z">Z</MenuItem>
      </TextField>
    </Box>
  );
};

export default SalaryForm;
