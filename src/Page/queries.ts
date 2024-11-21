// queries.ts
import { gql } from "@apollo/client";

// GraphQL query to fetch clients by userId
export const GET_CLIENTS = gql`
  query GetClients($userId: ID!) {
    clients(userId: $userId) {
      id
      name
      company
      email
      gstNumber
    }
  }
`;

// GraphQL mutation to delete a client
export const DELETE_CLIENT = gql`
  mutation DeleteClient($id: ID!) {
    deleteClient(id: $id) {
      success
      message
    }
  }
`;
