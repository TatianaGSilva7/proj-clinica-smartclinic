import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {useEffect } from "react";
import { login } from "../services/login";
import Login from "../(public)/login";

function PrivateLayout() {
  useEffect(() => {
    const handleLogin = async () => {
      const data = await login();
      console.log("data", data);
    };

    handleLogin();
  }, []);

  return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flexDirection: "row" }}>
          <Login />
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

export default PrivateLayout;
