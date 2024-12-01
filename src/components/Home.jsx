import { Stack } from "@mui/material";
import Footer from "shared/footer/Footer";
import Account from "./account/Account";
import Header from "./account/header/Header";

function Home() {
  return (
    <Stack>
      <Header />
      <Account />
      <Footer />
    </Stack>
  );
}

export default Home;
