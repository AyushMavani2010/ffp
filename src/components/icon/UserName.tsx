import { ReactComponent as ArrowRight } from "../../Asset/icon/Vector (1).svg";
import React, { FC } from "react";

interface IconProps {
  color?: string;
  size?: number;
}

const UserName: FC<IconProps> = ({ color, size }) => {
  return <ArrowRight width={size} height={size} color={color} />;
};

export default UserName;
