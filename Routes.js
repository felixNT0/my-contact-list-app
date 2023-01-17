import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ContactDetails from "./components/ContactDetails/ContactDetails";
import CreateContact from "./components/CreateContact/CreateContact";
import DeletedContacts from "./components/DeletedContacts/DeletedContacts";
import EditContact from "./components/EditContact/EditContact";

import Home from "./components/Home/Home";
import navigationString from "./navigationString";

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen component={Home} name={navigationString.HOME} />
        <Stack.Screen
          component={ContactDetails}
          name={navigationString.CONTACT_DETAILS}
        />
        <Stack.Screen
          component={CreateContact}
          name={navigationString.CREATE_CONTACT}
        />
        <Stack.Screen
          component={EditContact}
          name={navigationString.EDIT_CONTACT}
        />
        <Stack.Screen
          component={DeletedContacts}
          name={navigationString.DELETED_CONTACT}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
