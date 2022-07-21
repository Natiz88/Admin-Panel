import React, { lazy } from "react";
import { useContext } from "react";
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
  // window.addEventListener("beforeunload", (e) => {
  //   e.preventDefault();
  //   localStorage.removeItem("token");
  // });
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          {isLoggedIn && <Route path="/app" component={Layout} />}

          <Route path="*">
            <Redirect exact from="/" to="/login" />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
