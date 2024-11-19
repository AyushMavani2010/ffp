import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../components/Header";

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
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 5;

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/invoice")
      .then((response) => {
        setInvoices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching invoice data:", error);
      });
  }, []);

  const totalPages = Math.ceil(invoices.length / invoicesPerPage);
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
      .then(() => {
        setInvoices((prevInvoices) =>
          prevInvoices.filter((invoice: any) => invoice.id !== invoiceId)
        );
      })
      .catch((error) => {
        console.error("Error deleting invoice:", error);
      });
  };

  return (
    <RootContainer>
      <Header />

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
            {currentInvoices.map((invoice: any, index) => (
              <tr key={index}>
                <td>{invoice.client}</td>
                <td>{invoice.invoiceDate}</td>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.dueDate}</td>
                <td>
                  <button onClick={() => handleViewInvoice(invoice)}>
                    <VisibilityIcon />
                  </button>
                  <button onClick={() => handleEditInvoice(invoice.id)}>
                    <EditIcon />
                  </button>
                  <button onClick={() => handleDeleteInvoice(invoice.id)}>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ClientTable>
      </ContentSection>

      <PaginationContainer>
        {[...Array(totalPages)].map((_, index) => (
          <PageButton
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}
      </PaginationContainer>
    </RootContainer>
  );
};

export default Dashboard;
