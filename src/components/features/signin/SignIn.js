import * as React from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../ui/copyright/Copyright";
import { Link } from "react-router-dom";

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  error: {
    display: "block",
    color: "red",
    fontSize: ".8rem",
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    let users = localStorage.getItem("registeredUsers");
    users = users ? JSON.parse(users) : [];
    let result = users.find(
      (arr) => arr.email == data.email && arr.password == data.password
    );
    if (result) {
      const user = {
        username: result.username,
        email: result.email,
      };
      sessionStorage.setItem("loggedUser", JSON.stringify(user));
      history.push("/secured");
    } else {
      alert("user not found. check your email and password");
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
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 0.5, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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

            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "Please enter minimum six characters",
                },
              })}
            />
            {errors?.password && (
              <span className={classes.error}>{errors.password.message}</span>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item textAlign="center">
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
              <Grid item>
                <Copyright sx={{ mt: 8, mb: 4 }} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
