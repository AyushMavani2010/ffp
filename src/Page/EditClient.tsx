import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";
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

const EditClient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const clientData = location.state?.client || {};
  
  const [formData, setFormData] = useState({
    name: clientData.name || "",
    company: clientData.company || "",
    email: clientData.email || "",
    gstNumber: clientData.gstNumber || "",
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e:any) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/client/${clientData.id}`, formData)
      .then(() => {
        alert("Client updated successfully!");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error updating client:", error);
        alert("Failed to update client.");
      });
  };

  return (
    <RootContainer>
      <FormContainer onSubmit={handleFormSubmit}>
        <Title>Edit Client</Title>
        
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleInputChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          name="gstNumber"
          placeholder="GST Number"
          value={formData.gstNumber}
          onChange={handleInputChange}
          required
        />
        <SubmitButton type="submit">Update Client</SubmitButton>
      </FormContainer>
    </RootContainer>
  );
};

export default EditClient;
