import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import CustomAppBar from "../components/CustomAppBar";
import React from "react";
import AdminHomeScreen from "../screens/AdminHomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../context/ThemeContext";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  const { theme } = useTheme();
    return (
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.textColor,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          header: ({ navigation }) => <CustomAppBar navigation={navigation} title={route.name} isRoot={route.name === "Inicio"} />,
        })}
      >
        <Stack.Screen name="Inicio" component={AdminHomeScreen} />
      </Stack.Navigator>
    );
}

function ProfileStack() {
  const { theme } = useTheme();
  
    return (
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.textColor,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          header: ({ navigation }) => <CustomAppBar navigation={navigation} title={route.name} isRoot={route.name === "Perfil"} />,
        })}
      >
        <Stack.Screen name="Perfil" component={ProfileScreen} />
      </Stack.Navigator>
    );
  }

  function AdminNavigator() {
    const { theme } = useTheme();
    
    return (
      <Drawer.Navigator screenOptions={{ headerShown: false,drawerActiveTintColor:"#3f9b0b", headerStyle: {
        backgroundColor: theme.background,
      },
      headerTintColor: theme.textColor,
      headerTitleStyle: {
        fontWeight: "bold",
      },
      drawerStyle: {
        backgroundColor: theme.background,
      },
      drawerActiveTintColor: "#3f9b0b",
      drawerInactiveTintColor: theme.textColor, }}>
        <Drawer.Screen name="HomeStack" component={HomeStack} options={{ title: "Inicio" }} />
        <Drawer.Screen name="ProfileStack" component={ProfileStack} options={{ title: "Perfil" }} />
      </Drawer.Navigator>
    );
  }

export default AdminNavigator;
