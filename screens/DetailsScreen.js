import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';

const DetailsScreen = ({ route }) => {
  const { pet } = route.params;
  const { theme } = useTheme();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const dynamicStyles = styles(theme);

  const isFavorite = favorites.some(fav => fav.id === pet.id);

  const handleAdoption = () => {
    Alert.alert(
      'Solicitud de Adopción',
      `Has solicitado adoptar a ${pet.name}`,
      [{ text: 'OK' }]
    );
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(pet.id);
    } else {
      addFavorite(pet);
    }
  };

  return (
    <ScrollView contentContainerStyle={dynamicStyles.container}>
      <Image source={{ uri: pet.image }} style={dynamicStyles.image} />
      <View style={dynamicStyles.detailsContainer}>
        <Text style={dynamicStyles.name}>{pet.name}</Text>
        <Text style={dynamicStyles.type}>Tipo: {pet.type.toUpperCase()}</Text>
        <Text style={dynamicStyles.detailText}>Tamaño: {pet.size}</Text>
        
        {pet.type === 'cat' && pet.breedInfo && (
          <>
            <Text style={dynamicStyles.detailText}>
              Raza: {pet.breedInfo.name || 'No disponible'}
            </Text>
            <Text style={dynamicStyles.detailText}>
              Temperamento: {pet.breedInfo.temperament || 'No disponible'}
            </Text>
            <Text style={dynamicStyles.detailText}>
              Esperanza de vida: {pet.breedInfo.life_span || 'No disponible'}
            </Text>
          </>
        )}

        {pet.type === 'dog' && (
          <Text style={dynamicStyles.detailText}>
            Raza: {pet.breedString.split('-').join(' ').toUpperCase()}
          </Text>
        )}

        <View style={dynamicStyles.buttonGroup}>
          <Button
            title={isFavorite ? "❤️ Quitar de favoritos" : "🤍 Añadir a favoritos"}
            onPress={toggleFavorite}
            color={theme.secondaryButton}
          />
          <Button
            title="Adoptar"
            onPress={handleAdoption}
            color={theme.primaryButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = (theme) => StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: theme.background,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.textColor,
    marginBottom: 10,
  },
  type: {
    fontSize: 18,
    color: theme.categoryText,
    marginBottom: 15,
    fontWeight: '600',
  },
  detailText: {
    fontSize: 16,
    color: theme.textColor,
    marginBottom: 8,
    lineHeight: 24,
  },
});

export default DetailsScreen;