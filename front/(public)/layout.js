import { View, Text, Button } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { login } from "../services/login";

function PublicLayout() {
  
  useEffect(() => {

    const handleLogin = async() =>{
        const data = await login()
        console.log("data", data)
    }
 
    handleLogin()
  }, [])
  
    return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flexDirection: "row" }}>
        <View style={{ height: 100, backgroundColor: "blue", flex: 0.2 }} />
        <View style={{ height: 100, backgroundColor: "red", flex: 0.4 }} />
        <Text>Hello World!</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default PublicLayout;
