import React, { lazy } from "react";
import axios from "axios";
import { useEffect, useContext } from "react";
import { LoginContext } from "./context/LoginContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function App() {
  const { isLoggedIn } = useContext(LoginContext);
  console.log("isloggedin", isLoggedIn);
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          {!isLoggedIn && <Route path="/login" component={Login} />}
          <Route path="/forgot-password" component={ForgotPassword} />
          {isLoggedIn && <Route path="/app" component={Layout} />}
          {/* If you have an index page, you can remothis Redirect */}

          <Route path="*">
            <Redirect exact from="/" to="/login" />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
