import React, { useCallback } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import useLogin from "../../hooks/useLogin";
import { createStyles, makeStyles } from "@mui/styles";
import { green } from "@mui/material/colors";

const useStyles = makeStyles(() =>
  createStyles({
    textField: {
      color: green[900],
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "rgba(0, 0, 0, 0.23)", // default
        },
        "&.Mui-focused fieldset": {
          border: "2px solid darkBlue", // customized
        },
        borderRadius: "10px",
        fontSize: "1.2rem",
      },
    },
  })
);

const SignInPage = () => {
  const classes = useStyles();
  const login = useLogin();
  const navigate = useNavigate();
  const onSubmit = useCallback(
    async ({ username, password }) => {
      const res = await login(username, password);
      if (res) {
        navigate("/home");
      }
    },
    [login, navigate]
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LoginIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            className={classes.textField}
            {...register("username", {
              required: true,
              minLength: 4,
              maxLength: 128,
            })}
            error={!!errors.username}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Имя аккаунта"
            name="username"
            autoComplete="username"
            autoFocus
          />

          <TextField
            className={classes.textField}
            {...register("password", {
              required: true,
              minLength: 4,
              maxLength: 128,
            })}
            error={!!errors.password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  alert(
                    "Обратитесь к администратору для восстановления пароля"
                  );
                }}
                variant="body2"
              >
                Забыли пароль?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInPage;
