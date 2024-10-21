import styled from "@emotion/styled";
import React, { FC, ReactNode } from "react";

interface ButtonProps {
  name?: string;
  BgColor?: any;
  borderRadius: string;
  width: string;
  height: string;
  startIcon?: ReactNode | undefined;
  endIcon?: ReactNode | undefined;
  icon?: ReactNode | undefined;
  onClick?: any;
  color: string;
  style?: any | undefined;
  border: string;
  type?: any;
}
const RootContainer = styled.button<{
  width: string;
  height: string;
  borderRadius: string;
  BgColor: string;
  color: string;
  border: string;
}>(({ width, height, BgColor, borderRadius, color, border }) => ({
  display: "flex",
  width: width,
  height: height,
  borderRadius: borderRadius,
  backgroundColor: BgColor,
  justifyContent: "space-around",
  color: color,
  alignItems: "center",
  border: border,
  fontWeight: 700,
}));

const Button: FC<ButtonProps> = ({
  BgColor,
  borderRadius,
  height,
  width,
  icon,
  name,
  endIcon,
  startIcon,
  onClick,
  style,
  color,
  border,
  type,
}) => {
  return (
    <RootContainer
      width={width}
      height={height}
      borderRadius={borderRadius}
      BgColor={BgColor}
      style={style}
      color={color}
      border={border}
      type={type}
      onClick={onClick}
    >
      {name}
      {icon}
    </RootContainer>
  );
};

export default Button;
