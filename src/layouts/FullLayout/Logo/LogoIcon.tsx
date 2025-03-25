import React from "react";
import { useTheme } from "@mui/material";
import logoNormal from "../../../assets/images/arto-site-logo.png";
import logoReverse from "../../../assets/images/arto-site-logo-reverse.png";

interface LogoIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  // Additional props specific to LogoIcon can be added here
}

const LogoIcon: React.FC<LogoIconProps> = (props) => {
  const theme = useTheme();
  const logo = theme.palette.mode === 'dark' ? logoReverse : logoNormal;
  
  return <img alt="Arto" src={logo} height="48px" {...props} />;
};

export default LogoIcon;
