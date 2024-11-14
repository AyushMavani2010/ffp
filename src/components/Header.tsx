import React from "react";
import styled from "@emotion/styled";
import { useCookies } from "react-cookie";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
const RootContainer = styled.div({
  width: "100%",
  backgroundColor: "#f5f5f5",
});
const Root = styled.header({
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
const Header = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["token"]);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <RootContainer>
      <Root>
        <h1>Inventory</h1>
        <nav>
          <NavLinks>
            <li>
              <a href="/clients">Clients</a>
            </li>
            <li>
              <a href="/invoicedashboard">Invoices</a>
            </li>
          </NavLinks>
        </nav>

        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Root>
    </RootContainer>
  );
};

export default Header;
