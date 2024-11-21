// Dashboard.tsx
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useQuery, useMutation } from "@apollo/client"; // Use Apollo hooks
import { GET_CLIENTS, DELETE_CLIENT } from "../Page/queries";
import { jwtDecode } from "jwt-decode";
import ReactPaginate from "react-paginate";
import Header from "../components/Header";
import { JwtPayload } from ".././types";

const RootContainer = styled.div({
  width: "100%",
  padding: "20px",
  backgroundColor: "#f5f5f5",
});

const ContentSection = styled.section({
  backgroundColor: "white",
  margin: "20px",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
});

const TableHeader = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const AddClientButton = styled.button({
  backgroundColor: "#6c63ff",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
});

const ClientTable = styled.table({
  width: "100%",
  marginTop: "20px",
  borderCollapse: "collapse",
  th: {
    backgroundColor: "#4c6ef5",
    color: "white",
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  "tbody tr:nth-of-type(odd)": {
    backgroundColor: "#f9f9f9",
  },
});

const PaginationContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
});

const PageButton = styled.button({
  margin: "0 5px",
  padding: "5px 10px",
  backgroundColor: "#6c63ff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  "&:disabled": {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
});

const Dashboard = () => {
    const navigate = useNavigate();
    const [cookies, , removeCookie] = useCookies(["token"]);
  
    let userId = "";
    const token = cookies.token;
  
    if (token) {
      try {
        // Decode the token using the extended JwtPayload type and ensure the token conforms to JwtPayload
        const decodedToken = jwtDecode<JwtPayload>(token); // Use the custom JwtPayload type
        userId = decodedToken.id; // Now TypeScript knows the token has an 'id' field
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  
    // Fetching clients using Apollo Client's useQuery hook
    const { data, loading, error, refetch } = useQuery(GET_CLIENTS, {
      variables: { userId }, // Passing the decoded userId
      skip: !cookies.token, // Skip query if token is missing
    });
  
    // Mutation hook for deleting a client
    const [deleteClient] = useMutation(DELETE_CLIENT, {
      onCompleted: () => refetch(), // Refetch after deleting
    });
  
    const handleLogout = () => {
      removeCookie("token");
      navigate("/login");
    };
  
    const handleDeleteClient = (clientId: string) => {
      deleteClient({ variables: { id: clientId } });
    };
  
    const handleClientUpdate = (clientId: string) => {
      const client = data?.clients.find((client: any) => client.id === clientId);
      if (client) {
        navigate("/editclient", { state: { client } });
      }
    };
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    // Pagination logic
    const currentPage = 1;
    const clientsPerPage = 5;
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = data.clients.slice(
      indexOfFirstClient,
      indexOfLastClient
    );

  return (
    <RootContainer>
      <Header />
      <ContentSection>
        <TableHeader>
          <h2>Client List</h2>
          <AddClientButton onClick={() => navigate("/addclient")}>
            Add Client
          </AddClientButton>
        </TableHeader>

        <ClientTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company Name</th>
              <th>Company Email</th>
              <th>GST Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map((client: any, index: number) => (
              <tr key={index}>
                <td>{client.name}</td>
                <td>{client.company}</td>
                <td>{client.email}</td>
                <td>{client.gstNumber}</td>
                <td>
                  <button onClick={() => handleClientUpdate(client.id)}>
                    <EditIcon />
                  </button>
                  <button onClick={() => handleDeleteClient(client.id)}>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ClientTable>
      </ContentSection>

      <PaginationContainer>
        {/* Pagination controls can be added here */}
      </PaginationContainer>
    </RootContainer>
  );
};

export default Dashboard;
