import { Stack } from "@mui/material";
import { useEffect } from 'react';
import Footer from "shared/footer/Footer";
import Account from "./account/Account";
import Header from "./account/header/Header";
import { useAuth } from "security/AuthContext";

function Home() {
  const auContext = useAuth();
  const { Logout } = useAuth();

  useEffect(() => {
    auContext.Logout();
  }, [Logout]);

  return (
    <Stack>
      <Header />
      <Account />
      <Footer />
    </Stack>
  );
}

export default Home;
