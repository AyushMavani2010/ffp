import { Navigate, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const PrivateRoute = ({ element, ...rest }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompany, setHasCompany] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  useEffect(() => {
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken?.id || decodedToken?.userId;
        if (userId) {
          fetchCompanyData(userId).then((companyData) => {
            setHasCompany(companyData.length > 0);
            setIsAuthenticated(true);
            setLoading(false);
          });
        } else {
          setIsAuthenticated(false);
          setLoading(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
        console.error("Error decoding token:", error);
      }
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, [token]);

  const fetchCompanyData = async (userId: any) => {
    try {
      const response = await axios.get("http://localhost:5000/company/user", {
        params: { user_id: userId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching company data:", error);
      return [];
    }
  };

  if (loading) return <div>Loading...</div>;


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasCompany && !rest.path.includes("/addcompany")) {
    return <Navigate to="/addcompany" replace />;
  }

  return element;
};

export default PrivateRoute;
