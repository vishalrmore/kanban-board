import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Blank from "./components/layouts/blank/Blank";
import Full from "./components/layouts/full/Full";

const isAuth = sessionStorage.getItem("loggedUser");
const ProtectedRoute = ({ children, ...props }) => {
  return isAuth ? (
    <Route {...props}>{children}</Route>
  ) : (
    <Redirect to="/signin" />
  );
};

const App = () => {
  return (
    <>
      <Switch>
        <ProtectedRoute path="/secured" >
          <Full />
        </ProtectedRoute>
        <Route path="/">
          <Blank />
        </Route>
      </Switch>
    </>
  );
};

export default App;
