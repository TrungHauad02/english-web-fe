// import { ThemeProvider } from "@emotion/react";
import CustomTheme from "./theme/CustomTheme";
import AppRoutes from "./shared/routes/AppRoutes";
import AuthProvider from "./security/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// function App() {
//   return (
//     <ThemeProvider theme={CustomTheme}>
//       <AppRoutes />
//     </ThemeProvider>
//   );
// }

function App() {
  return (
    <AuthProvider theme={CustomTheme}>
      <AppRoutes />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
