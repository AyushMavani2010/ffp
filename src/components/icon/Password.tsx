import { ReactComponent as PassworD } from "../../Asset/icon/Vector (2).svg";
import React, { FC } from "react";

interface IconProps {
  color?: string;
  size?: number;
}

const Password: FC<IconProps> = ({ color, size }) => {
  return <PassworD width={size} height={size} color={color} />;
};

export default Password;
