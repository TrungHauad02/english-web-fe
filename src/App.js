import { ThemeProvider } from "@emotion/react";
import CustomTheme from "./theme/CustomTheme";
import AppRoutes from "./shared/routes/AppRoutes";

function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
