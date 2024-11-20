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

// import styled from "@emotion/styled";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useForm, Controller } from "react-hook-form";
// import {
//   TextField,
//   Button,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers";
// import Header from "../components/Header";
// import { jwtDecode } from "jwt-decode";

// const RootContainer = styled.div({
//   width: "100%",
//   padding: "20px",
//   backgroundColor: "#f5f5f5",
// });

// const FormContainer = styled.form`
//   display: flex;
//   flex-direction: column;
//   width: 600px;
//   margin: 50px auto;
//   padding: 30px;
//   border-radius: 10px;
//   background-color: #f9f9f9;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
// `;

// const Title = styled.h2`
//   text-align: center;
//   margin-bottom: 20px;
//   font-family: Arial, sans-serif;
// `;

// const RowContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 15px;
// `;

// const SubmitButton = styled.button`
//   padding: 10px;
//   font-size: 18px;
//   color: white;
//   background-color: #007bff;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const AddInvoice = () => {
//   const navigate = useNavigate();
//   const {
//     control,
//     handleSubmit,
//     setValue,
//     watch,
//     register,
//     formState: { errors },
//   } = useForm();

//   const [clients, setClients] = useState([]);
//   const [items, setItems] = useState<any[]>([]);
//   const [totalAmount, setTotalAmount] = useState<number>(0);
//   const [selectedClient, setSelectedClient] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     let userId = "";

//     if (token) {
//       try {
//         const decodedToken: any = jwtDecode(token);
//         userId = decodedToken.id;
//       } catch (error) {
//         console.error("Error decoding token:", error);
//       }
//     }

//     if (userId) {
//       axios
//         .get(`http://localhost:5000/client/userId?user_id=${userId}`)
//         .then((response) => {
//           setClients(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching client data:", error);
//         });
//     }
//   }, []);

//   const handleAddItem = () => {
//     const itemName = watch("itemName");
//     const amount = watch("amount");
//     const quantity = watch("quantity");

//     if (!itemName || !amount || !quantity) {
//       alert("Please fill out all item fields.");
//       return;
//     }

//     const totalItemCost = amount * quantity;
//     setItems([...items, { itemName, amount, quantity, totalItemCost }]);
//     setTotalAmount(totalAmount + totalItemCost);

//     // Reset item fields
//     setValue("itemName", "");
//     setValue("amount", "");
//     setValue("quantity", 1);
//   };

//   const onSubmit = (data: any) => {
//     const token = localStorage.getItem("token");
//     let userId = "";

//     if (token) {
//       try {
//         const decodedToken: any = jwtDecode(token);
//         userId = decodedToken.id;
//       } catch (error) {
//         console.error("Error decoding token:", error);
//       }
//     }

//     const invoiceData = {
//       ...data,
//       items,
//       totalAmount,
//       userId,
//       client: selectedClient,
//     };

//     axios
//       .post("http://localhost:5000/addinvoice", invoiceData)
//       .then((response) => {
//         if (response && response.data) {
//           console.log(response.data.message);
//           navigate("/invoicedashboard");
//         }
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   };
//   return (
//     <RootContainer>
//       <Header />
//       <FormContainer onSubmit={handleSubmit(onSubmit)}>
//         <Title>Add Invoice</Title>

//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <RowContainer>
//             <Controller
//               name="invoiceDate"
//               control={control}
//               defaultValue={null}
//               rules={{ required: "Invoice date is required" }}
//               render={({ field }) => (
//                 <DatePicker
//                   {...field}
//                   label="Invoice Date"
//                   onChange={(newValue) => field.onChange(newValue)}
//                   slotProps={{
//                     textField: {
//                       error: !!errors.invoiceDate,
//                       helperText:
//                         typeof errors.invoiceDate?.message === "string"
//                           ? errors.invoiceDate.message
//                           : "",
//                     },
//                   }}
//                 />
//               )}
//             />
//             <Controller
//               name="dueDate"
//               control={control}
//               defaultValue={null}
//               rules={{ required: "Due date is required" }}
//               render={({ field }) => (
//                 <DatePicker
//                   {...field}
//                   label="Due Date"
//                   onChange={(newValue) => field.onChange(newValue)}
//                   slotProps={{
//                     textField: {
//                       error: !!errors.dueDate,
//                       helperText:
//                         typeof errors.dueDate?.message === "string"
//                           ? errors.dueDate.message
//                           : "",
//                     },
//                   }}
//                 />
//               )}
//             />
//           </RowContainer>
//         </LocalizationProvider>

//         <Controller
//           name="invoiceNumber"
//           control={control}
//           defaultValue=""
//           rules={{ required: "Invoice Number is required" }}
//           render={({ field }) => (
//             <TextField
//               label="Invoice Number"
//               {...register("invoiceNumber", {
//                 required: "Invoice number is required",
//               })}
//               error={!!errors.invoiceNumber}
//               helperText={
//                 typeof errors.invoiceNumber?.message === "string"
//                   ? errors.invoiceNumber.message
//                   : ""
//               }
//             />
//           )}
//         />

//         <FormControl fullWidth margin="normal">
//           <InputLabel id="client-select-label">Client</InputLabel>
//           <Controller
//             name="selectedClient"
//             control={control}
//             defaultValue=""
//             value={selectedClient}
//             onChange={(e) => setSelectedClient(e.target.value)}
//             rules={{ required: "Client selection is required" }}
//             render={({ field }) => (
//               <Select
//                 {...field}
//                 labelId="client-select-label"
//                 error={!!errors.selectedClient}
//               >
//                 {clients.map((client: any) => (
//                   <MenuItem key={client.id} value={client.id}>
//                     {client.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             )}
//           />
//         </FormControl>
//         {errors.selectedClient && (
//           <p>{String(errors.selectedClient.message)}</p>
//         )}

//         <RowContainer>
//           <Controller
//             name="itemName"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Item Name"
//                 fullWidth
//                 margin="normal"
//               />
//             )}
//           />
//           <Controller
//             name="amount"
//             control={control}
//             defaultValue={0}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Amount"
//                 type="number"
//                 fullWidth
//                 margin="normal"
//               />
//             )}
//           />
//           <Controller
//             name="quantity"
//             control={control}
//             defaultValue={1}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Quantity"
//                 type="number"
//                 fullWidth
//                 margin="normal"
//               />
//             )}
//           />
//         </RowContainer>

//         <Button variant="outlined" onClick={handleAddItem}>
//           Add Item
//         </Button>

//         <h3>Total Amount: {totalAmount}</h3>

//         <ul>
//           {items.map((item, index) => (
//             <li key={index}>
//               {item.itemName} - {item.quantity} x {item.amount} ={" "}
//               {item.totalItemCost}
//             </li>
//           ))}
//         </ul>

//         <SubmitButton type="submit">Submit</SubmitButton>
//       </FormContainer>
//     </RootContainer>
//   );
// };

// export default AddInvoice;



