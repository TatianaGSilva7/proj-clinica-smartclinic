import { View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import LoginReader from "../components/Login/LoginHeader";
import LoginForm from "../components/Login/LoginForm";
import LoginOptions from "../components/Login/LoginOptions";

function Login() {
  //   useEffect(() => {
  //     const handleLogin = async () => {
  //       const data = await login();
  //       console.log("data", data);
  //     };

  //     handleLogin();
  //   }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <LoginReader />
        <LoginForm />
        <LoginOptions />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    height: 100,
    width: "100%" ,
  },
  iconContainer: {
    width: 50,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    
  }
});

export default Login;
