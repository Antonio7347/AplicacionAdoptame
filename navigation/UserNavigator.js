import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import CustomAppBar from "../components/CustomAppBar";
import React from "react";
import UserHomeScreen from "../screens/UserHomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../context/ThemeContext";
import { FavoritesProvider } from "../context/FavoritesContext"; // Importa el CartProvider

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
        <Stack.Screen name="Inicio" component={UserHomeScreen} />
        <Stack.Screen name="Detalles" component={DetailsScreen} />
      </Stack.Navigator>
    );
}

function FavoriteStack() {
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
          header: ({ navigation }) => <CustomAppBar navigation={navigation} title={route.name} isRoot={route.name === "Favoritos"} />,
        })}
      >
        <Stack.Screen name="Favoritos" component={FavoriteScreen} />
        <Stack.Screen name="Detalles" component={DetailsScreen} />
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

  function UserNavigator() {
    const { theme } = useTheme();

    return (
      <FavoritesProvider>
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
        <Drawer.Screen name="FavoriteStack" component={FavoriteStack} options={{ title: "Favoritos" }} />
      </Drawer.Navigator>
      </FavoritesProvider>
      
    );
  }

export default UserNavigator;
  
