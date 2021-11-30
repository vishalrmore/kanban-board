import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import Copyright from "../../ui/copyright/Copyright";

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  error: {
    display: "block",
    color: "red",
    fontSize: ".8rem",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const onSubmit = (data) => {
    let users = localStorage.getItem("registeredUsers");
    users = users ? JSON.parse(users) : [];
    let result = users.find((arr) => arr.email == data.email);
    if (result) {
      alert("email is already registered try with different email");
    } else {
      users.push(data);
      localStorage.setItem("registeredUsers", JSON.stringify(users));
    }
    reset("", {
      keepValues: false,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  {...register("username", {
                    required: "username is required",
                  })}
                />
                {errors?.username && (
                  <span className={classes.error}>
                    {errors.username.message}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors?.email && (
                  <span className={classes.error}>{errors.email.message}</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contactnumber"
                  label="Contact number"
                  name="contactnumber"
                  autoComplete="number"
                  {...register("contact", {
                    minLength: { value: 10, message: "Please enter 10 digits" },
                    maxLength: { value: 10, message: "Please enter 10 digits" },
                  })}
                />
                {errors?.contact && (
                  <span className={classes.error}>
                    {errors.contact.message}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "password is required",
                    minLength: {
                      value: 6,
                      message: "Please enter minimum six characters",
                    },
                  })}
                />
                {errors?.password && (
                  <span className={classes.error}>
                    {errors.password.message}
                  </span>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link to="/signin">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
