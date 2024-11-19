import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
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
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 5;

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

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

  const totalPages = Math.ceil(clients.length / clientsPerPage);
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteClient = (clientId: any) => {
    axios
      .delete(`http://localhost:5000/client/${clientId}`)
      .then(() => {
        setClients((prevClients) =>
          prevClients.filter((client: any) => client.id !== clientId)
        );
      })
      .catch((error) => {
        console.error("Error deleting client:", error);
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
            {currentClients.map((client: any, index) => (
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
