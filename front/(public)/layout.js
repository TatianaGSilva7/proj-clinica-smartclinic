import { View, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";


function PublicLayout() {
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
