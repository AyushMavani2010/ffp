import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
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

const RootContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

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
  const [clients, setClients] = React.useState([]);
  const [items, setItems] = React.useState<any[]>([]);
  const [totalAmount, setTotalAmount] = React.useState<number>(0);
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

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleAddItem = (data: any) => {
    const totalItemCost = data.amount * data.quantity;
    setItems((prevItems) => [
      ...prevItems,
      { itemName: data.itemName, amount: data.amount, quantity: data.quantity, totalItemCost },
    ]);
    setTotalAmount((prevTotal) => prevTotal + totalItemCost);
    setValue("itemName", "");
    setValue("amount", 0);
    setValue("quantity", 1);
  };

  const onSubmit = (data: any) => {
    const invoiceData = {
      invoiceDate: data.invoiceDate,
      dueDate: data.dueDate,
      invoiceNumber: data.invoiceNumber,
      client: data.selectedClient,
      totalAmount,
      items,
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
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Title>Add Invoice</Title>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RowContainer>
            <div>
              <Controller
                name="invoiceDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Invoice Date"
                    value={field.value || null}
                    onChange={(newValue) => field.onChange(newValue)}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Due Date"
                    value={field.value || null}
                    onChange={(newValue) => field.onChange(newValue)}
                  />
                )}
              />
            </div>
          </RowContainer>
        </LocalizationProvider>

        <Controller
          name="invoiceNumber"
          control={control}
          defaultValue=""
          rules={{ required: "Invoice Number is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Invoice Number"
              fullWidth
              margin="normal"
              error={!!errors.invoiceNumber}
              helperText={
                errors.invoiceNumber?.message ? String(errors.invoiceNumber?.message) : undefined
              }
            />
          )}
        />

        <Controller
          name="selectedClient"
          control={control}
          rules={{ required: "Client is required" }}
          render={({ field }) => (
            <FormControl fullWidth margin="normal" error={!!errors.selectedClient}>
              <InputLabel>Client</InputLabel>
              <Select {...field} label="Client" required>
                {clients.map((client: any) => (
                  <MenuItem key={client.id} value={client.name}>
                    {client.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <RowContainer>
          <Controller
            name="itemName"
            control={control}
            rules={{ required: "Item name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Item Name"
                fullWidth
                margin="normal"
                error={!!errors.itemName}
                helperText={
                  errors.itemName?.message ? String(errors.itemName?.message) : undefined
                }
              />
            )}
          />

          <Controller
            name="amount"
            control={control}
            rules={{ required: "Amount is required", min: 0 }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Amount"
                type="number"
                margin="normal"
                error={!!errors.amount}
                helperText={
                  errors.amount?.message ? String(errors.amount?.message) : undefined
                }
              />
            )}
          />

          <Controller
            name="quantity"
            control={control}
            defaultValue={1}
            rules={{ required: "Quantity is required", min: 1 }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Quantity"
                type="number"
                margin="normal"
                error={!!errors.quantity}
                helperText={
                  errors.quantity?.message ? String(errors.quantity?.message) : undefined
                }
              />
            )}
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
                <b>Item Name:</b> {item.itemName} = <b>Quantity:</b> {item.quantity} x <b>Amount:</b> {item.amount} = <b>Total:</b> {item.totalItemCost}
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
