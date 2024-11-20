import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

import Login from "./Page/Login";
import Registration from "./Page/Registraion";
import AddClient from "./Page/AddClient";
import Clients from "./Page/clients";
import MainDashBoard from "./Page/dashBoard";
import InvoiceDashBoard from "./Page/InvoiceDashBoard";
import AddInvoice from "./Page/AddInvoice";
import InvoicePage from "./Page/InvoicePage";
import AddCompany from "./Page/AddCompany";
import EditClient from "./Page/EditClient";
import EditInvoice from "./Page/EditInvoice";
import { jwtDecode } from "jwt-decode";
import store from "./redux/apii/store";
import { Provider } from "react-redux";

const App = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const token = cookies.token;
  const [hasCompany, setHasCompany] = useState(false);
  if (token) localStorage.setItem("token", token);

  const fetchCompanyData = async (userId: any) => {
    try {
      const response = await axios.get("http://localhost:5000/company/user", {
        params: { user_id: userId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching company data:", error);
      return null;
    }
  };
  useEffect(() => {
    const checkCompanyAndRedirect = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");
      try {
        if (!token) {
          if (
            location.pathname !== "/login" &&
            location.pathname !== "/register"
          ) {
            navigate("/login", { replace: true });
          }
        } else {
          const userId = (() => {
            try {
              const decodedToken: any = jwtDecode(token);
              return decodedToken?.id || decodedToken?.userId;
            } catch (error) {
              console.error("Error decoding token:", error);
              return null;
            }
          })();

          if (userId) {
            const companyData = await fetchCompanyData(userId);
            console.log("Company Data:", companyData);

            if (companyData && companyData.length > 0) {
              setHasCompany(true);
            } else {
              setHasCompany(false);
            }
          } else {
            console.error("Invalid or missing userId in token.");
            navigate("/login", { replace: true });
          }
        }
      } catch (error) {
        console.error("Error during redirection:", error);
      } finally {
        setLoading(false);
      }
    };

    checkCompanyAndRedirect();
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (!loading) {
      if (!token) {
        if (
          location.pathname !== "/login" &&
          location.pathname !== "/register"
        ) {
          navigate("/login", { replace: true });
        }
      } else if (hasCompany) {
        if (
          location.pathname === "/login" ||
          location.pathname === "/register" ||
          location.pathname === "/addcompany"
        ) {
          navigate("/dashboard", { replace: true });
        }
      } else {
        if (location.pathname !== "/addcompany") {
          navigate("/addcompany", { replace: true });
        }
      }
    }
  }, [loading, token, hasCompany, location.pathname, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>
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
          <Route path="/dashboard" element={<MainDashBoard />} />
          <Route path="/invoicedashboard" element={<InvoiceDashBoard />} />
          <Route path="/addinvoice" element={<AddInvoice />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/addclient" element={<AddClient />} />
          <Route path="/addcompany" element={<AddCompany />} />
          <Route path="/editclient" element={<EditClient />} />
          <Route path="/editinvoice/:invoiceId" element={<EditInvoice />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
