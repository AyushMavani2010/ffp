/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const RootContainer = styled.div({
  width: "100%",
  padding: "20px",
  backgroundColor: "#f5f5f5",
});

const Header = styled.header({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  background: "linear-gradient(to right, #141e30, #243b55)",
  color: "white",
  h1: {
    margin: 0,
  },
});

const NavLinks = styled.ul({
  display: "flex",
  gap: "20px",
  listStyle: "none",
  a: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
});

const LogoutButton = styled.button({
  backgroundColor: "#6c63ff",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
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

const ActionButton = styled.button({
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "5px",
});

const ViewAllButton = styled.button({
  display: "block",
  margin: "20px auto",
  padding: "10px 20px",
  backgroundColor: "#6c63ff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
});

const Dashboard = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [clients, setClients] = useState([]);
  const [visibleClients, setVisibleClients] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/clients")
      .then((response) => {
        setClients(response.data);
        setVisibleClients(response.data.slice(0, 5));
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
      });
  }, []);

  const handleViewAll = () => {
    setViewAll(true);
    setVisibleClients(clients);   
  };

  return (
    <RootContainer>
      <Header>
        <h1>Inventory</h1>

        <nav>
          <NavLinks>
            <li>
              <a href="#">Clients</a>
            </li>
            <li>
              <a href="#">Invoices</a>
            </li>
          </NavLinks>
        </nav>

        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>

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
            {visibleClients.map((client: any, index) => (
              <tr key={index}>
                <td>{client.name}</td>
                <td>{client.company}</td>
                <td>{client.email}</td>
                <td>{client.gstNumber}</td>
                <td>
                  <ActionButton>✏️</ActionButton>
                  <ActionButton>🗑️</ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </ClientTable>
      </ContentSection>

      {!viewAll && clients.length > 5 && (
        <ViewAllButton onClick={handleViewAll}>View All Clients</ViewAllButton>
      )}
    </RootContainer>
  );
};

export default Dashboard;
