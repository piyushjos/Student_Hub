import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  var authed;
  if (localStorage.getItem("role") === "student") {
    authed = true;
  } else {
    authed = false;
  }

  return authed ? children : <Navigate to="/" />;
};

export default PrivateRoute;
