import { View, Text, Button } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { login } from "../services/login";
import Login from "./login";

function PublicLayout() {
  useEffect(() => {
    const handleLogin = async () => {
      const data = await login();
      console.log("data", data);
    };

    handleLogin();
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <Login />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default PublicLayout;
