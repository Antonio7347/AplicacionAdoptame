import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';

const FavoriteScreen = () => {
  const { favorites } = useFavorites();
  const { theme } = useTheme();
  const dynamicStyles = styles(theme);

  return (
    <ScrollView contentContainerStyle={dynamicStyles.container}>
      <Text style={dynamicStyles.header}>Mis Favoritos</Text>
      
      {favorites.length === 0 ? (
        <Text style={dynamicStyles.emptyText}>No tienes mascotas favoritas aún</Text>
      ) : (
        favorites.map(pet => (
          <View key={pet.id} style={dynamicStyles.card}>
            <Text style={dynamicStyles.petName}>{pet.name}</Text>
            <Text style={dynamicStyles.petInfo}>Tipo: {pet.type.toUpperCase()}</Text>
            <Text style={dynamicStyles.petInfo}>Tamaño: {pet.size}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = (theme) => StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.background, // Se adapta al tema
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.textColor, // Color de texto según el tema
      textAlign: 'center',
      marginVertical: 20,
    },
    emptyText: {
      fontSize: 16,
      color: theme.textColor, // Color de texto para mensaje de "vacío"
      textAlign: 'center',
      marginTop: 20,
    },
    card: {
      backgroundColor: theme.cardBackground, // Fondo del card según el tema
      borderRadius: 10,
      marginBottom: 15,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    petName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.textColor, // Color de nombre de la mascota
    },
    petInfo: {
      fontSize: 14,
      color: theme.categoryText, // Color del texto de información
      marginTop: 5,
    },
  });

export default FavoriteScreen;