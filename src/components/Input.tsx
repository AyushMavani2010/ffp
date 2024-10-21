import React, { ChangeEvent, FC, forwardRef } from "react";
import styled from "@emotion/styled";

interface InputProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  color?: string;
  height?: string | number;
  width?: string | number;
  placeholder?: string;
  value?: string;
  name?: string;
  type?: string;
  required?: boolean;
  error?: any;
  style?: any;
  backgroundColor?: any;
}

const INput = styled.input({
  fontSize: "16px",
  fontWeight: 400,
  border: "none",
  outline: "none",
  backgroundColor: "rgba(240, 237, 255, 0.8)",
  marginRight: "10px",
});

const ErrorMessage = styled.div({
  color: "red",
  fontSize: "12px",
  marginTop: "5px",
});
export type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>(
  (
    {
      height,
      onChange,
      value,
      backgroundColor,
      width,
      name,
      color,
      type,
      placeholder,
      required,
      error,
      style,
    },
    ref
  ) => {
    return (
      <>
        <INput
          onChange={onChange}
          type={type}
          style={style}
          placeholder={placeholder}
          value={value}
          name={name}
          required={required}
          ref={ref}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </>
    );
  }
);

export default Input;
