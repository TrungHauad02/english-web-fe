// import { ThemeProvider } from "@emotion/react";
import CustomTheme from "./theme/CustomTheme";
import AppRoutes from "./shared/routes/AppRoutes";
import AuthProvider from "./components/security/AutthContext";

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
    </AuthProvider>
  );
}

export default App;
