import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

export const EMAIL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const ClientForm = ({ data, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit ? onSubmit(data) : console.log(data)
      )}
    >
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          style={{ width: "100%" }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          pb={2}
        >
          <Box
            style={{ width: "100%" }}
            display="flex"
            flexDirection="column"
            alignContent="center"
            pb={2}
          >
            <TextField
              {...register("fullName", {
                required: true,
                minLength: 4,
                maxLength: 128,
              })}
              error={!!errors.fullName}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="ФИО"
              name="fullName"
              autoFocus
            />
            <TextField
              {...register("email", {
                required: true,
                minLength: 4,
                maxLength: 128,
                pattern: EMAIL_REGEX,
              })}
              error={!!errors.email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
            />
            <TextField
              {...register("phone", {
                required: true,
                minLength: 5,
                maxLength: 32,
              })}
              error={!!errors.phone}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Номер телефона"
              name="phone"
              autoFocus
            />
            <TextField
              {...register("organization", {
                required: true,
                minLength: 4,
                maxLength: 40,
              })}
              error={!!errors.organization}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="organization"
              label="Организация"
              name="organization"
              autoFocus
            />
          </Box>

          <Button
            type="submit"
            variant="outlined"
            color="primary"
            style={{ width: "100%" }}
          >
            submit
          </Button>
        </Box>
      </Container>
    </form>
  );
};

export default ClientForm;
