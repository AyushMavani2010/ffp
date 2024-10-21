import { ReactComponent as EmaiL } from "../../Asset/icon/email.svg";
import React, { FC } from "react";

interface IconProps {
  color?: string;
  size?: number;
}

const Email: FC<IconProps> = ({ color, size }) => {
  return <EmaiL width={size} height={size} color={color} />;
};

export default Email;
