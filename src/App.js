import CustomTheme from "./theme/CustomTheme";
import AppRoutes from "./shared/routes/AppRoutes";
import AuthProvider from "./security/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "shared/errorBoundary/ErrorBoundary";
import { ThemeProvider } from "@emotion/react";

function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <AuthProvider>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
