import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import Header from "../components/Header";
import { jwtDecode } from "jwt-decode";

const RootContainer = styled.div({
  width: "100%",
  padding: "20px",
  backgroundColor: "#f5f5f5",
});

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 600px;
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

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
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

const AddInvoice = () => {
  const [invoiceDate, setInvoiceDate] = useState<any>();
  const [dueDate, setDueDate] = useState<any>();
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [items, setItems] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/client")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
      });
  }, []);

  const handleAddItem = () => {
    const totalItemCost = amount * quantity;

    setItems((prevItems) => [
      ...prevItems,
      { itemName, amount, quantity, totalItemCost },
    ]);

    setTotalAmount(totalAmount + totalItemCost);

    setItemName("");
    setAmount(0);
    setQuantity(1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!invoiceNumber || !selectedClient || !invoiceDate || !dueDate) {
      alert("Please fill out all required fields.");
      return;
    }
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
    const invoiceData = {
      invoiceDate,
      dueDate,
      invoiceNumber,
      client: selectedClient,
      totalAmount,
      items,
      userId,
    };

    axios
      .post("http://localhost:5000/addinvoice", invoiceData)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data.message);
          navigate("/invoicedashboard");
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
      <FormContainer onSubmit={handleSubmit}>
        <Title>Add Invoice</Title>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RowContainer>
            <div>
              <DatePicker
                label="Invoice Date"
                value={invoiceDate}
                onChange={(newValue) => setInvoiceDate(newValue)}
              />
            </div>
            <div>
              <DatePicker
                label="Due Date"
                value={dueDate}
                onChange={(newValue) => setDueDate(newValue)}
              />
            </div>
          </RowContainer>
        </LocalizationProvider>

        <TextField
          label="Invoice Number"
          placeholder="Invoice Number"
          onChange={(e) => setInvoiceNumber(e.target.value)}
          value={invoiceNumber}
          required
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="client-select-label">Client</InputLabel>
          <Select
            labelId="client-select-label"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            label="Client"
            required
          >
            {clients.map((client: any) => (
              <MenuItem key={client.id} value={client.name}>
                {client.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <RowContainer>
          <TextField
            label="Item Name"
            placeholder="Item Name"
            onChange={(e) => setItemName(e.target.value)}
            value={itemName}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Amount"
            type="number"
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount}
            margin="normal"
          />
          <TextField
            label="Quantity"
            type="number"
            onChange={(e) => setQuantity(Number(e.target.value))}
            value={quantity}
            margin="normal"
          />
        </RowContainer>

        <Button variant="outlined" onClick={handleAddItem}>
          Add Item
        </Button>

        <h3>Total Amount: {totalAmount}</h3>

        <h3>Items:</h3>
        {items.length > 0 ? (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <b>itemName:</b>
                {item.itemName} = <b> itemQunantity:</b>
                {item.quantity} x <b> itemAmount:</b> {item.amount} ={" "}
                <b>Total:</b>
                {item.totalItemCost}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items added yet.</p>
        )}

        <SubmitButton type="submit">Submit</SubmitButton>
      </FormContainer>
    </RootContainer>
  );
};

export default AddInvoice;
