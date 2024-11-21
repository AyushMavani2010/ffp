import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const PublicRoute = ({ element, ...rest }: any) => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
};

export default PublicRoute;
