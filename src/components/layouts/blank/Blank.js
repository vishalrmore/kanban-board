import React from "react";
import { Container } from "@mui/material";
import { Switch, Route } from "react-router-dom";

import Home from "../../features/home/Home";
import SignIn from "../../features/signin/SignIn";
import SignUp from "../../features/signup/SignUp";
import Header from "../../ui/header/Header";
import Footer from "../../ui/footer/Footer";

const Blank = () => {
  return (
    <>
      <Container
        maxWidth="xl"
        disableGutters={true}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
        </Switch>
        <Footer />
      </Container>
    </>
  );
};

export default Blank;
