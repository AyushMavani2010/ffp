/** @jsxImportSource @emotion/react */
import React from "react";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";

const InvoiceContainer = styled.div({
  maxWidth: "800px",
  margin: "40px auto",
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const InvoiceHeader = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  h2: {
    margin: 0,
    color: "#333",
  },
});

const InvoiceDetails = styled.div({
  marginBottom: "20px",
  p: {
    margin: "5px 0",
    fontSize: "16px",
    strong: {
      color: "#4c6ef5",
    },
  },
});

const ItemsTable = styled.table({
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  th: {
    backgroundColor: "#4c6ef5",
    color: "white",
    padding: "10px",
    textAlign: "left",
    fontWeight: "bold",
    borderBottom: "2px solid #ddd",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    color: "#555",
  },
  "tbody tr:nth-of-type(odd)": {
    backgroundColor: "#f9f9f9",
  },
});

const NoItemsMessage = styled.p({
  color: "#888",
  fontStyle: "italic",
});

const PrintButton = styled.button({
  padding: "10px 20px",
  backgroundColor: "#4c6ef5",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  ":hover": {
    backgroundColor: "#3b5cb8",
  },
});

const InvoicePage = () => {
  const location = useLocation();
  const { invoice } = location.state || {};

  const handlePrint = () => {
    window.print();
  };

  return (
    <InvoiceContainer>
      {invoice ? (
        <>
          <InvoiceHeader>
            <h2>Invoice Details</h2>
            <PrintButton onClick={handlePrint}>Print Invoice</PrintButton>
          </InvoiceHeader>

          <InvoiceDetails>
            <p>
              <strong>Client:</strong> {invoice.client}
            </p>
            <p>
              <strong>Invoice Date:</strong>{" "}
              {new Date(invoice.invoiceDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Invoice Number:</strong> {invoice.invoiceNumber}
            </p>
            <p>
              <strong>Due Date:</strong>{" "}
              {new Date(invoice.dueDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Total Amount:</strong> ${invoice.totalAmount}
            </p>
          </InvoiceDetails>

          {invoice.items && invoice.items.length > 0 ? (
            <>
              <h3>Items</h3>
              <ItemsTable>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Amount</th>
                    <th>Quantity</th>
                    <th>Total Item Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item: any, index: any) => (
                    <tr key={index}>
                      <td>{item.itemName}</td>
                      <td>${item.amount}</td>
                      <td>{item.quantity}</td>
                      <td>${item.totalItemCost}</td>
                    </tr>
                  ))}
                </tbody>
              </ItemsTable>
            </>
          ) : (
            <NoItemsMessage>No items listed for this invoice.</NoItemsMessage>
          )}
        </>
      ) : (
        <p>No invoice data found.</p>
      )}
    </InvoiceContainer>
  );
};

export default InvoicePage;
