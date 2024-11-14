import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Header from "../components/Header";

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
  width: "100%",
});

const TableHeader = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const Root = styled.div({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
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
  const [updateClients, setUpdateClients] = useState([]);
  const [visibleClients, setVisibleClients] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [viewAllInvoice, setViewAllInvoice] = useState(false);
  const [visibleInvoice, setVisibleInvoice] = useState([]);
  const [client, setClient] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/client")
      .then((response) => {
        setClients(response.data);
        setVisibleClients(response.data.slice(0, 5));
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/invoice")
      .then((response) => {
        setInvoice(response.data);
        setVisibleInvoice(response.data.slice(0, 5));
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
      });
  }, []);

  const handleViewAll = () => {
    setViewAll(true);
    setVisibleClients(clients);
  };

  const handleViewAllInvoice = () => {
    setViewAllInvoice(true);
    setVisibleInvoice(invoice);
  };

  const handleViewInvoice = (invoice: any) => {
    navigate("/invoice", { state: { invoice } });
  };
  const handleEditInvoice = (invoiceId: any) => {
    navigate(`/editinvoice/${invoiceId}`);
  };
  const handleDeleteInvoice = (invoiceId: any) => {
    axios
      .delete(`http://localhost:5000/invoice/${invoiceId}`)
      .then((response) => {
        setInvoice((prevInvoice) =>
          prevInvoice.filter((invoice: any) => invoice.id !== invoiceId)
        );
        setVisibleInvoice((prevVisible) =>
          prevVisible.filter((invoice: any) => invoice.id !== invoiceId)
        );
      })
      .catch((error) => {
        console.error("Error deleting invoice:", error);
      });
  };
  const handleDeleteClient = (clientId: any) => {
    axios
      .delete(`http://localhost:5000/client/${clientId}`)
      .then((response) => {
        setClient((prevInvoice) =>
          prevInvoice.filter((client: any) => client.id !== clientId)
        );
        setVisibleClients((prevVisible) =>
          prevVisible.filter((client: any) => client.id !== clientId)
        );
      })
      .catch((error) => {
        console.error("Error deleting invoice:", error);
      });
  };
  const handleClientUpdate = (clientId: string) => {
    const client = clients.find((client: any) => client.id === clientId);
    if (client) {
      navigate("/editclient", { state: { client } });
    }
  };
  return (
    <RootContainer>
      <Header />
      <Root>
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
                    <ActionButton onClick={() => handleClientUpdate(client.id)}>
                      <EditIcon />
                    </ActionButton>
                    <ActionButton onClick={() => handleDeleteClient(client.id)}>
                      <DeleteIcon />
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </ClientTable>
        </ContentSection>
        <ContentSection>
          <TableHeader>
            <h2>Invoice List</h2>
            <AddClientButton onClick={() => navigate("/addinvoice")}>
              Add Invoice
            </AddClientButton>
          </TableHeader>

          <ClientTable>
            <thead>
              <tr>
                <th>Client</th>
                <th>Invoice Date</th>
                <th>Invoice Number</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleInvoice.map((invoice: any, index) => (
                <tr key={index}>
                  <td>{invoice.client}</td>
                  <td>{invoice.invoiceDate}</td>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.dueDate}</td>
                  <td>
                    <ActionButton onClick={() => handleViewInvoice(invoice)}>
                      <VisibilityIcon />
                    </ActionButton>
                    <ActionButton onClick={() => handleEditInvoice(invoice.id)}>
                      <EditIcon />
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleDeleteInvoice(invoice.id)}
                    >
                      <DeleteIcon />
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </ClientTable>
        </ContentSection>
      </Root>

      <div style={{ display: "flex" }}>
        {!viewAll && clients.length > 5 && (
          <ViewAllButton onClick={handleViewAll}>
            View All Clients
          </ViewAllButton>
        )}

        {!viewAllInvoice && invoice.length > 5 && (
          <ViewAllButton onClick={handleViewAllInvoice}>
            View All Invoice
          </ViewAllButton>
        )}
      </div>
    </RootContainer>
  );
};

export default Dashboard;
