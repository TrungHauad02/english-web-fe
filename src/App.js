import { ThemeProvider } from "@emotion/react";
import Home from "./components/Home";
import CustomTheme from "./theme/CustomTheme";

function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
