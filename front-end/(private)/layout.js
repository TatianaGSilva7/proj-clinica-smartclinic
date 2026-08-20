import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {useEffect } from "react";
import { login } from "../services/login";
import Login from "../(public)/login";

function PrivateLayout() {

  return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flexDirection: "row" }}>
          <Login />
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

export default PrivateLayout;
