import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Button, Modal, TextInput, Alert } from "react-native";
import { useTheme } from "../context/ThemeContext";

const AdminHomeScreen = ({ navigation }) => {
  const [pets, setPets] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'cat',
    size: 'medium',
    image: ''
  });
  const { theme } = useTheme();

  useEffect(() => {
    const fetchInitialPets = async () => {
      try {
        // Fetch initial cats
        const catResponse = await fetch('https://api.thecatapi.com/v1/images/search?limit=5&has_breeds=1');
        const catData = await catResponse.json();
        const cats = catData.map(cat => ({
          id: cat.id,
          image: cat.url,
          name: cat.breeds?.[0]?.name || 'Cat',
          type: 'cat',
          size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)]
        }));

        // Fetch initial dogs
        const dogResponse = await fetch('https://dog.ceo/api/breeds/image/random/5');
        const dogData = await dogResponse.json();
        const dogs = dogData.message.map((url, index) => ({
          id: `dog-${index}-${url}`,
          image: url,
          name: `Dog ${index + 1}`,
          type: 'dog',
          size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)]
        }));

        setPets([...cats, ...dogs]);
      } catch (error) {
        console.error("Error fetching initial pets:", error);
      }
    };
    fetchInitialPets();
  }, []);

  const handleOpenModal = (pet = null) => {
    if (pet) {
      setFormData(pet);
      setEditingPet(pet.id);
    } else {
      setFormData({
        name: '',
        type: 'cat',
        size: 'medium',
        image: ''
      });
      setEditingPet(null);
    }
    setIsModalVisible(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.image) {
      Alert.alert('Error', 'Nombre e imagen son requeridos');
      return;
    }

    if (editingPet) {
      setPets(prev => prev.map(pet => 
        pet.id === editingPet ? { ...pet, ...formData } : pet
      ));
    } else {
      const newPet = {
        id: Date.now().toString(),
        ...formData
      };
      setPets(prev => [...prev, newPet]);
    }
    setIsModalVisible(false);
  };

  const handleDelete = (petId) => {
    Alert.alert(
      'Eliminar mascota',
      '¿Estás seguro de eliminar esta mascota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => 
          setPets(prev => prev.filter(pet => pet.id !== petId))
        }
      ]
    );
  };

  const filteredPets = pets.filter(pet => {
    if (selectedFilter === 'all') return true;
    return pet.type === selectedFilter;
  });

  const dynamicStyles = styles(theme);

  return (
    <View style={dynamicStyles.container}>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={dynamicStyles.modalContent}>
          <Text style={dynamicStyles.modalTitle}>
            {editingPet ? 'Editar Mascota' : 'Nueva Mascota'}
          </Text>
          
          <TextInput
            style={dynamicStyles.input}
            placeholder="Nombre"
            value={formData.name}
            onChangeText={text => setFormData({ ...formData, name: text })}
          />
          
          <TextInput
            style={dynamicStyles.input}
            placeholder="URL de la imagen"
            value={formData.image}
            onChangeText={text => setFormData({ ...formData, image: text })}
          />
          
          <View style={dynamicStyles.selectorContainer}>
            <Text style={dynamicStyles.selectorLabel}>Tipo:</Text>
            <TouchableOpacity
              style={[
                dynamicStyles.selectorButton,
                formData.type === 'cat' && dynamicStyles.selectedSelector
              ]}
              onPress={() => setFormData({ ...formData, type: 'cat' })}
            >
              <Text>Gato</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                dynamicStyles.selectorButton,
                formData.type === 'dog' && dynamicStyles.selectedSelector
              ]}
              onPress={() => setFormData({ ...formData, type: 'dog' })}
            >
              <Text>Perro</Text>
            </TouchableOpacity>
          </View>

          <View style={dynamicStyles.selectorContainer}>
            <Text style={dynamicStyles.selectorLabel}>Tamaño:</Text>
            {['small', 'medium', 'large'].map(size => (
              <TouchableOpacity
                key={size}
                style={[
                  dynamicStyles.selectorButton,
                  formData.size === size && dynamicStyles.selectedSelector
                ]}
                onPress={() => setFormData({ ...formData, size })}
              >
                <Text>{size.charAt(0).toUpperCase() + size.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={dynamicStyles.modalButtons}>
            <Button title="Cancelar" onPress={() => setIsModalVisible(false)} />
            <Button title="Guardar" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>

      <View style={dynamicStyles.headerContainer}>
        <Text style={dynamicStyles.header}>Administrar Mascotas</Text>
        <Button
          title="+ Agregar"
          onPress={() => handleOpenModal()}
          color={theme.primaryButton}
        />
      </View>

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
                {pet.type.toUpperCase()} | {pet.size.toUpperCase()}
              </Text>
              
              <View style={dynamicStyles.adminButtonGroup}>
                <Button 
                  title="Editar" 
                  onPress={() => handleOpenModal(pet)} 
                  color={theme.secondaryButton}
                />
                <Button
                  title="Eliminar"
                  onPress={() => handleDelete(pet.id)}
                  color={theme.warningButton}
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.textColor,
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
  adminButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    gap: 10,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.background,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.textColor,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: theme.textColor,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: theme.textColor,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  selectorLabel: {
    color: theme.textColor,
    marginRight: 10,
  },
  selectorButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.textColor,
  },
  selectedSelector: {
    backgroundColor: theme.secondaryButton,
    borderColor: theme.secondaryButton,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default AdminHomeScreen;