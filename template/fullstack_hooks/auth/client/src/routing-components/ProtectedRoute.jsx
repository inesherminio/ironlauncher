import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import * as PATHS from "../utils/paths";

// the protected route component must take a user in order to check if the user is authenticated or not. If not moves the user to the login page
const ProtectedRoute = ({
  user,
  exact,
  path,
  component,
  ...componentProps
}) => {
  const Component = component;
  if (!user) {
    return <Navigate to={PATHS.LOGINPAGE} />;
  }
  return (
    <Routes>
      <Route
        exact={exact}
        path={path}
        render={(props) => (
          <Component {...componentProps} {...props} user={user} />
        )}
      />
    </Routes>
  );
};

export default ProtectedRoute;
