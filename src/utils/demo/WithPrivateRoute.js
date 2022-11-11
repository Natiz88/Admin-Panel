import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { GlobalAppContext, Spinner } from "../components";
import { useCookies } from "react-cookie";
import { ImSpinner2 } from "react-icons/im";
// import jwtDecode from "jwt-decode";

const withPrivateRoute = (AuthComponent) => {
  function PrivateComponent({ children }) {
    const history = useHistory();
    const [cookies] = useCookies();

    const [loading, setLoading] = useState(true);
    // const { setUser } = useContext(GlobalAppContext);

    useEffect(() => {
      if (cookies.p_1) {
        setLoading(false);
        console.log("truee");
        // const user = jwtDecode(cookies.p_1);
        // setUser(user);
        return;
      } else {
        setLoading(false);
        console.log("falsee");
        history.push("/login");
        return;
      }
    }, [cookies.p_1, history]);

    if (loading) {
      return <ImSpinner2 />;
    }

    return <>{children}</>;
  }

  return class Higher extends React.Component {
    render() {
      return (
        <PrivateComponent>
          <AuthComponent {...this.props} />
        </PrivateComponent>
      );
    }
  };
};

export { withPrivateRoute };
