import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [invoice, setInvoice] = useState([]);
  const [visibleInvoice, setVisibleInvoice] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

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

  return (
    <RootContainer>
      <Header>
        <h1>Inventory</h1>

        <nav>
          <NavLinks>
            <li>
              <a href="/clients">Clients</a>
            </li>
            <li>
              <a href="/#">Invoices</a>
            </li>
          </NavLinks>
        </nav>

        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>

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
                  <ActionButton onClick={() => handleDeleteInvoice(invoice.id)}>
                    <DeleteIcon />
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </ClientTable>
      </ContentSection>

      {!viewAll && invoice.length > 5 && (
        <ViewAllButton onClick={handleViewAll}>View All Invoice</ViewAllButton>
      )}
    </RootContainer>
  );
};

export default Dashboard;
