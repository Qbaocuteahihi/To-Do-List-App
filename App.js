import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </ReduxProvider>
  );
}
