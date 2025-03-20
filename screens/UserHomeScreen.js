import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";

const UserHomeScreen = ({ navigation }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [pets, setPets] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { theme } = useTheme();
  const nav = useNavigation();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        // Fetch cats
        const catResponse = await fetch('https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1');
        const catData = await catResponse.json();
        const cats = catData.map(cat => ({
          id: cat.id,
          image: cat.url,
          name: cat.breeds?.[0]?.name || 'Cat',
          type: 'cat',
          breedInfo: cat.breeds?.[0] || {},
          size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] // Simulación de tamaño
        }));

        // Fetch dogs
        const dogResponse = await fetch('https://dog.ceo/api/breeds/image/random/10');
        const dogData = await dogResponse.json();
        const dogs = dogData.message.map((url, index) => {
          const breedString = url.split('/breeds/')[1]?.split('/')[0] || '';
          const breedNameParts = breedString.split('-');
          const name = breedNameParts
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .reverse()
            .join(' ');
          return {
            id: `dog-${index}-${url}`,
            image: url,
            name: name,
            type: 'dog',
            breedString: breedString,
            size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] // Simulación de tamaño
          };
        });

        setPets([...cats, ...dogs]);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
    fetchPets();
  }, []);

  const handleDetails = (pet) => {
    nav.navigate("Detalles", { pet });
  };

  const handleAdoption = (pet) => {
    Alert.alert(
      'Solicitud de Adopción',
      `Has solicitado adoptar a ${pet.name}`,
      [{ text: 'OK', onPress: () => console.log('Adoption request sent') }]
    );
  };

  const toggleFavorite = (pet) => {
    const isFavorite = favorites.some(fav => fav.id === pet.id);
    if (isFavorite) {
      removeFavorite(pet.id);
    } else {
      addFavorite(pet);
    }
  };

  const filteredPets = pets.filter(pet => {
    if (selectedFilter === 'all') return true;
    return pet.type === selectedFilter;
  });

  const dynamicStyles = styles(theme);

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.header}>Gatos y perros a adoptar</Text>
      
      {/* Filtros */}
      <View style={dynamicStyles.filterContainer}>
        <TouchableOpacity
          style={[dynamicStyles.filterButton, selectedFilter === 'all' && dynamicStyles.activeFilter]}
          onPress={() => setSelectedFilter('all')}
        >
          <Text style={dynamicStyles.filterText}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[dynamicStyles.filterButton, selectedFilter === 'cat' && dynamicStyles.activeFilter]}
          onPress={() => setSelectedFilter('cat')}
        >
          <Text style={dynamicStyles.filterText}>Gatos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[dynamicStyles.filterButton, selectedFilter === 'dog' && dynamicStyles.activeFilter]}
          onPress={() => setSelectedFilter('dog')}
        >
          <Text style={dynamicStyles.filterText}>Perros</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={dynamicStyles.scrollContainer}>
        {filteredPets.map((pet) => (
          <View key={pet.id} style={dynamicStyles.card}>
            <Image 
              source={{ uri: pet.image }} 
              style={dynamicStyles.cardImage} 
              resizeMode="cover"
            />
            <View style={dynamicStyles.cardBody}>
              <Text style={dynamicStyles.cardTitle}>{pet.name}</Text>
              <Text style={dynamicStyles.cardType}>
                Tipo: {pet.type.toUpperCase()} | Tamaño: {pet.size}
              </Text>
              
              <View style={dynamicStyles.buttonGroup}>
                <Button 
                  title="Ver Detalles" 
                  onPress={() => handleDetails(pet)} 
                  color={theme.secondaryButton}
                />
                <Button
                  title={favorites.some(f => f.id === pet.id) ? "❤️ Quitar" : "🤍 Favorito"}
                  onPress={() => toggleFavorite(pet)}
                  color={theme.secondaryButton}
                />
                <Button
                  title="Adoptar"
                  onPress={() => handleAdoption(pet)}
                  color={theme.primaryButton}
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.background,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: theme.textColor,
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: theme.cardBackground,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 15,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardBody: {
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.textColor,
    marginBottom: 5,
  },
  cardType: {
    fontSize: 14,
    color: theme.categoryText,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  buttonText: {
    color: theme.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: theme.cardBackground,
  },
  activeFilter: {
    backgroundColor: theme.secondaryButton,
  },
  filterText: {
    color: theme.textColor,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
});

export default UserHomeScreen;