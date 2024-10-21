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
import { Cookies, useCookies } from "react-cookie";
import { useEffect, useState } from "react";

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
        justifyContent: "center",
      }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
