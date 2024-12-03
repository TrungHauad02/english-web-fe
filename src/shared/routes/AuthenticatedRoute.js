import { Navigate } from "react-router-dom";
import { useAuth } from "security/AuthContext";
import ErrorPage from "shared/utils/ErrorPage";

export default function AuthenticatedRoute({ children, role }) {
  const authContext = useAuth();

  if (!authContext.isAuthenticated) {
    return <Navigate to="/account" />;
  }

  if (role && authContext.userRole !== role) {
    return <ErrorPage errorType={403}/>
  }

  return children;
}
