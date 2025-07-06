import { Box, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function AddressForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <form>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
            <TextField
              required
              id="firstName"
              {...register("firstName")}
              label="First name"
              helperText="Enter First Name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              error={!!errors.firstName}
            />
            <TextField
              required
              id="lastName"
              {...register("lastName")}
              label="Last name"
              helperText="Enter Last Name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              error={!!errors.lastName}
            />
          </Box>

          <TextField
            required
            id="address1"
            {...register("address1")}
            label="Address line 1"
            helperText="Enter Address Line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            error={!!errors.address1}
          />

          <TextField
            id="address2"
            {...register("address2")}
            label="Address line 2"
            helperText="Enter Address Line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            error={!!errors.address2}
          />

          <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
            <TextField
              required
              id="city"
              {...register("city")}
              label="City"
              helperText="Enter City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              error={!!errors.city}
            />
            <TextField
              id="state"
              {...register("state")}
              label="State/Province/Region"
              helperText="Enter State"
              fullWidth
              variant="standard"
              error={!!errors.state}
            />
          </Box>

          <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
            <TextField
              required
              id="zip"
              {...register("zip")}
              label="Zip / Postal code"
              helperText="Enter Zip"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              error={!!errors.zip}
            />
            <TextField
              required
              id="country"
              {...register("country")}
              label="Country"
              helperText="Enter Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              error={!!errors.country}
            />
          </Box>
        </Box>
      </form>
    </>
  );
}
