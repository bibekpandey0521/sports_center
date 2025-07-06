import { Box, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment Form
      </Typography>
      <form>
        <Box
          component="div"
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              {...register("cardName")}
              label="Name on card"
              helperText="Enter Name on Card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              error={!!errors.cardName}
            />
            <TextField
              {...register("cardNumber")}
              label="Card number"
              helperText="Enter Card Number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              error={!!errors.cardNumber}
            />
          </Box>

          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              {...register("expDate")}
              label="Expiry date"
              helperText="Enter Expiry Date"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              error={!!errors.expDate}
            />
            <TextField
              {...register("cvv")}
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              error={!!errors.cvv}
            />
          </Box>

          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Box>
      </form>
    </>
  );
}
