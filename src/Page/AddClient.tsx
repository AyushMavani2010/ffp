import styled from "@emotion/styled";
import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

const RootContainer = styled.div({
  width: "100%",
  padding: "20px",
  backgroundColor: "#f5f5f5",
});

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 18px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
const Root = styled.div({
  width: "100%",
  padding: "20px",
  backgroundColor: "#f5f5f5",
});

const AddClient = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const { email, name, company, companyEmail, companyAddress, gstNumber } =
      data;
    const token = localStorage.getItem("token");
    let userId = "";

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        userId = decodedToken.id;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    const userData = {
      email,
      name,
      company,
      companyEmail,
      companyAddress,
      gstNumber,
      userId,
    };

    axios
      .post("http://localhost:5000/addclient", userData)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data.message);
          navigate("/dashboard");
        } else {
          console.log("No response data");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
        } else {
          console.error("Error occurred:", error.message);
        }
      });
  };

  return (
    <RootContainer>
      <Header />
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Title>Add Client</Title>

        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              message: "Invalid email format",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              label="Email"
              error={!!errors.email}
              helperText={
                errors.email?.message
                  ? String(errors.email?.message)
                  : undefined
              }
              fullWidth
              margin="normal"
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="Name"
              error={!!errors.name}
              helperText={
                errors.name?.message ? String(errors.name?.message) : undefined
              }
              fullWidth
              margin="normal"
            />
          )}
        />

        <Controller
          name="company"
          control={control}
          defaultValue=""
          rules={{ required: "Company name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="Company Name"
              error={!!errors.company}
              helperText={
                errors.company?.message
                  ? String(errors.company?.message)
                  : undefined
              }
              fullWidth
              margin="normal"
            />
          )}
        />

        <Controller
          name="companyEmail"
          control={control}
          defaultValue=""
          rules={{
            required: "Company email is required",
            pattern: {
              value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              message: "Invalid email format",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              label="Company Email"
              error={!!errors.companyEmail}
              helperText={
                errors.companyEmail?.message
                  ? String(errors.companyEmail?.message)
                  : undefined
              }
              fullWidth
              margin="normal"
            />
          )}
        />

        <Controller
          name="companyAddress"
          control={control}
          defaultValue=""
          rules={{ required: "Company address is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="Company Address"
              error={!!errors.companyAddress}
              helperText={
                errors.companyAddress?.message
                  ? String(errors.companyAddress?.message)
                  : undefined
              }
              fullWidth
              margin="normal"
            />
          )}
        />

        <Controller
          name="gstNumber"
          control={control}
          defaultValue=""
          rules={{ required: "GST number is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="GST Number"
              error={!!errors.gstNumber}
              helperText={
                errors.gstNumber?.message
                  ? String(errors.gstNumber?.message)
                  : undefined
              }
              fullWidth
              margin="normal"
            />
          )}
        />

        <SubmitButton type="submit">Submit</SubmitButton>
      </FormContainer>
    </RootContainer>
  );
};

export default AddClient;
