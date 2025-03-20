import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const ProfileScreen = () => {
  const { logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const dynamicStyles = styles(theme);

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>👤 Perfil</Text>
      <View style={dynamicStyles.profileInfo}>
        {user?.details ? (
          <>
            <Text style={dynamicStyles.label}>Nombre completo:</Text>
            <Text style={dynamicStyles.value}>
              {user.details.first_name} {user.details.last_name}
            </Text>

            <Text style={dynamicStyles.label}>Correo electrónico:</Text>
            <Text style={dynamicStyles.value}>{user.details.email}</Text>

            <Text style={dynamicStyles.label}>ID de usuario:</Text>
            <Text style={dynamicStyles.value}>{user.details.id}</Text>

            <Text style={dynamicStyles.label}>Rol:</Text>
            <Text style={dynamicStyles.value}>{user.role}</Text>
          </>
        ) : (
          <Text style={dynamicStyles.value}>No hay datos del usuario</Text>
        )}
        <TouchableOpacity style={{
                  backgroundColor: theme.warningButton,
                  padding: 12,
                  borderRadius: 8,
                  alignItems: "center",
                  marginHorizontal: 20,
                  marginBottom: 10,
                }}
                onPress={logout}>
                <Text style={dynamicStyles.buttonText}>Cerrar Sesión</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={toggleTheme}
                style={{
                  backgroundColor: theme.secondaryButton,
                  padding: 12,
                  borderRadius: 8,
                  alignItems: "center",
                  marginHorizontal: 20,
                  marginBottom: 10,
                }}
              >
                <Text style={dynamicStyles.buttonText}>Cambiar Tema</Text>
              </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: theme.background,
    },
    
  logoutButton: {
    backgroundColor: theme.warningButton,
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: "start",
  },
  buttonText: {
    color: theme.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme.categoryText,
    },
    profileInfo: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 10,
      color: theme.textColor,
    },
    value: {
      fontSize: 16,
      marginBottom: 10,
      color: theme.textColor,
      textAlign: "start",
    },
  });

export default ProfileScreen;
