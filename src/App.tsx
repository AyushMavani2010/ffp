import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./Page/Login";
import Registration from "./Page/Registraion";
import AddClient from "./Page/AddClient";
import DashBorad from "./Page/clients";
import MainDashBoard from "./Page/MainDashBoard";
import InvoiceDashBoard from "./Page/InvoiceDashBoard";
import AddInvoice from "./Page/AddInvoice";
import InvoicePage from "./Page/InvoicePage";
import Clients from "./Page/clients";
import { Cookies, useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import EditClient from "./Page/EditClient";
import EditInvoice from "./Page/EditInvoice";

const App = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const token = cookies.token;
  localStorage.setItem("token", token);

  useEffect(() => {
    setLoading(false);
    if (
      !token &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      navigate("/login", { replace: true });
    } else if (
      token &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate("/home", { replace: true });
    }
  }, [token, location.pathname, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
      }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/maindashboard" element={<MainDashBoard />} />
        <Route path="/invoicedashboard" element={<InvoiceDashBoard />} />
        <Route path="/addinvoice" element={<AddInvoice />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/addclient" element={<AddClient />} />
        <Route path="/editclient" element={<EditClient />} />
        <Route path="/editinvoice/:invoiceId" element={<EditInvoice />} />
        <Route path="*" element={<Navigate to="/maindashboard" replace />} />
      </Routes>
    </div>
  );
};

export default App;
