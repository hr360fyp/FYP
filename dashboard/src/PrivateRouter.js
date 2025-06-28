import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PrivateRouter({ component: Component, roles, ...rest }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!userInfo) {
          return <Redirect to="/login" />;
        }

        if (userInfo && roles.includes(userInfo.role)) {
          return <Component {...props} />;
        } else {
          localStorage.removeItem("userInfo");
          localStorage.removeItem("registerInfo");
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default PrivateRouter;
