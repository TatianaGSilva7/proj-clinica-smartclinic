import { View, Text, Button } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { login } from "../services/login";
import { AuthContext } from "../context/authContext";
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
    <AuthContext>
      <SafeAreaProvider>
        <SafeAreaView style={{ flexDirection: "row" }}>
          <Login />
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthContext>
  );
}

export default PrivateLayout;
