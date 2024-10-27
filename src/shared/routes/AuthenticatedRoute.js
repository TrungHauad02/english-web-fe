import { Navigate } from "react-router-dom";
import { useAuth } from "../../components/security/AutthContext";

export default function AuthenticatedRoute({ children }) {
    const authContext = useAuth();
    if (authContext.isAuthenticated) {
        return children;
    }
    return <Navigate to="/" />;
}
