import styled from "@emotion/styled";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@mui/material";

const RootContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

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

const AddClient = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (
      !email ||
      !name ||
      !company ||
      !companyEmail ||
      !companyAddress ||
      !gstNumber
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const userData = {
      email,
      name,
      company,
      companyEmail,
      companyAddress,
      gstNumber,
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
      <FormContainer onSubmit={handleSubmit}>
        <Title>Add Client</Title>

        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <Input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <Input
          type="text"
          placeholder="Company Name"
          onChange={(e) => setCompany(e.target.value)}
          value={company}
          required
        />
        <Input
          type="email"
          placeholder="Company Email"
          onChange={(e) => setCompanyEmail(e.target.value)}
          value={companyEmail}
          required
        />
        <Input
          type="text"
          placeholder="Company Address"
          onChange={(e) => setCompanyAddress(e.target.value)}
          value={companyAddress}
          required
        />
        <Input
          type="text"
          placeholder="GST Number"
          onChange={(e) => setGstNumber(e.target.value)}
          value={gstNumber}
          required
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </FormContainer>
    </RootContainer>
  );
};

export default AddClient;
