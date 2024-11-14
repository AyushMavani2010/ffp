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
import DashBoard from "./Page/dashBoard";
import InvoiceDashBoard from "./Page/InvoiceDashBoard";
import AddInvoice from "./Page/AddInvoice";
import InvoicePage from "./Page/InvoicePage";
import Clients from "./Page/clients";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import EditClient from "./Page/EditClient";
import EditInvoice from "./Page/EditInvoice";
import AddCompany from "./Page/AddCompany";
import axios from "axios";

const App = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const location = useLocation();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = cookies.token;
  localStorage.setItem("token", token);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/company", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setCompany(response.data);
          setLoading(false);
          if (response.data.length > 0) {
            navigate("/dashboard", { replace: true });
          } else {
            navigate("/addcompany", { replace: true });
          }
        })
        .catch((error) => {
          console.error("Error fetching company data:", error);
          setLoading(false);
          navigate("/addcompany", { replace: true });
        });
    } else {
      setLoading(false);
      if (
        location.pathname !== "/login" &&
        location.pathname !== "/register"
      ) {
        navigate("/login", { replace: true });
      }
    }
  }, [token, navigate, location.pathname]);

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
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/addcompany" element={<AddCompany />} />
        <Route path="/invoicedashboard" element={<InvoiceDashBoard />} />
        <Route path="/addinvoice" element={<AddInvoice />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/addclient" element={<AddClient />} />
        <Route path="/editclient" element={<EditClient />} />
        <Route path="/editinvoice/:invoiceId" element={<EditInvoice />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default App;
