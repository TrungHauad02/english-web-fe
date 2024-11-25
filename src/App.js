// import { ThemeProvider } from "@emotion/react";
import CustomTheme from "./theme/CustomTheme";
import AppRoutes from "./shared/routes/AppRoutes";
import AuthProvider from "./security/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "shared/errorBoundary/ErrorBoundary";

function App() {
  return (
    <AuthProvider theme={CustomTheme}>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
