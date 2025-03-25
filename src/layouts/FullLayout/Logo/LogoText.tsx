import React from "react";
import logotxt from "../../../assets/images/logo-text.png";

interface LogoTextProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  // Additional props specific to LogoText can be added here
}

const LogoText: React.FC<LogoTextProps> = (props) => {
  return (
    <img alt="Logo" src={logotxt} {...props} />
  );
};

export default LogoText;
