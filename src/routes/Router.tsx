import React from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router-dom";

// Layouts
import FullLayout from "../layouts/FullLayout/FullLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";

// Pages
import ConvoDashboard2 from "../views/dashboards/ConvoDashboard2";
import LoginSelector from "../views/auth/LoginSelector";
import ModernLogin from "../views/auth/ModernLogin";
import Signup from "../views/auth/Signup";
import ForgotPassword from "../views/auth/ForgotPassword";

const ThemeRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginSelector /> },
      { path: "modern-login", element: <ModernLogin /> },
      { path: "signup", element: <Signup /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "", element: <Navigate to="/login" /> },
    ],
  },
  {
    path: "/app",
    element: <FullLayout />,
    children: [
      { path: "", element: <Navigate to="/app/dashboards/convo2" /> },
      { path: "dashboards/convo2", element: <ConvoDashboard2 /> }
    ],
  }
];

export default ThemeRoutes;
