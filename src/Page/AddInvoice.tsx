import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
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
interface Client {
  id: string; // Or 'number' based on your backend response
  name: string;
}

const AddInvoice = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm();

  const [clients, setClients] = useState<Client[]>([]); // Explicitly typing the `clients` state
  const [items, setItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedClient, setSelectedClient] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    let userId = "";

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        userId = decodedToken.id;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    if (userId) {
      axios
        .get(`http://localhost:5000/client/userId?user_id=${userId}`)
        .then((response) => {
          setClients(response.data); // Assuming response.data is an array of clients
        })
        .catch((error) => {
          console.error("Error fetching client data:", error);
        });
    }
  }, []);

  const handleAddItem = () => {
    const itemName = watch("itemName");
    const amount = watch("amount");
    const quantity = watch("quantity");

    if (!itemName || !amount || !quantity) {
      alert("Please fill out all item fields.");
      return;
    }

    const totalItemCost = amount * quantity;
    setItems([...items, { itemName, amount, quantity, totalItemCost }]);
    setTotalAmount(totalAmount + totalItemCost);

    setValue("itemName", "");
    setValue("amount", "");
    setValue("quantity", 1);
  };

  const onSubmit = (data: any) => {
    const token = localStorage.getItem("token");
    let userId = "";

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        userId = decodedToken.id;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    const selectedClientName = clients.find(
      (client) => client.id === data.selectedClient
    )?.name;

    const invoiceData = {
      ...data,
      items,
      totalAmount,
      userId,
      client: selectedClientName,
    };

    axios
      .post("http://localhost:5000/addinvoice", invoiceData)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data.message);
          navigate("/invoicedashboard");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <RootContainer>
      <Header />
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Title>Add Invoice</Title>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RowContainer>
            <Controller
              name="invoiceDate"
              control={control}
              defaultValue={null}
              rules={{ required: "Invoice date is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Invoice Date"
                  onChange={(newValue) => field.onChange(newValue)}
                  slotProps={{
                    textField: {
                      error: !!errors.invoiceDate,
                      helperText:
                        typeof errors.invoiceDate?.message === "string"
                          ? errors.invoiceDate.message
                          : "",
                    },
                  }}
                />
              )}
            />
            <Controller
              name="dueDate"
              control={control}
              defaultValue={null}
              rules={{ required: "Due date is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Due Date"
                  onChange={(newValue) => field.onChange(newValue)}
                  slotProps={{
                    textField: {
                      error: !!errors.dueDate,
                      helperText:
                        typeof errors.dueDate?.message === "string"
                          ? errors.dueDate.message
                          : "",
                    },
                  }}
                />
              )}
            />
          </RowContainer>
        </LocalizationProvider>

        <Controller
          name="invoiceNumber"
          control={control}
          defaultValue=""
          rules={{ required: "Invoice Number is required" }}
          render={({ field }) => (
            <TextField
              label="Invoice Number"
              {...register("invoiceNumber", {
                required: "Invoice number is required",
              })}
              error={!!errors.invoiceNumber}
              helperText={
                typeof errors.invoiceNumber?.message === "string"
                  ? errors.invoiceNumber.message
                  : ""
              }
            />
          )}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="client-select-label">Client</InputLabel>
          <Controller
            name="selectedClient"
            control={control}
            defaultValue=""
            rules={{ required: "Client selection is required" }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="client-select-label"
                error={!!errors.selectedClient}
              >
                {clients.map((client: any) => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        {errors.selectedClient && (
          <p>{String(errors.selectedClient.message)}</p>
        )}

        <RowContainer>
          <Controller
            name="itemName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Item Name"
                fullWidth
                margin="normal"
              />
            )}
          />
          <Controller
            name="amount"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                {...field}
                label="Amount"
                type="number"
                fullWidth
                margin="normal"
              />
            )}
          />
          <Controller
            name="quantity"
            control={control}
            defaultValue={1}
            render={({ field }) => (
              <TextField
                {...field}
                label="Quantity"
                type="number"
                fullWidth
                margin="normal"
              />
            )}
          />
        </RowContainer>

        <Button variant="outlined" onClick={handleAddItem}>
          Add Item
        </Button>

        <h3>Total Amount: {totalAmount}</h3>

        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.itemName} - {item.quantity} x {item.amount} ={" "}
              {item.totalItemCost}
            </li>
          ))}
        </ul>

        <SubmitButton type="submit">Submit</SubmitButton>
      </FormContainer>
    </RootContainer>
  );
};

export default AddInvoice;
