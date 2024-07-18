import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/index";
import EntryScreen from "../screens/Entry";
import CashBookScreen from "../screens/CashBook";
import CashBookSelectionScreen from "../screens/CashBookSelection";

const Stack = createNativeStackNavigator();

function Routes(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Entry" component={EntryScreen} />
        <Stack.Screen name="CashBook" component={CashBookScreen} />
        <Stack.Screen
          name="CashBookSelection"
          component={CashBookSelectionScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
