import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Mapa de place_type a íconos de FontAwesome
const iconMap = {
  restaurant: 'cutlery',
  cafe: 'coffee',
  amusement_park: 'rocket',
  lodging: 'bed',
  spa: 'spa',
  bar: 'beer',
  night_club: 'moon',
};

const PlaceItem = ({ place }) => {
  const iconName = iconMap[place.place_type] || 'question'; // Usa un ícono por defecto si no se encuentra el place_type

  return (
    <View style={styles.container}>
      <FontAwesome
        name={iconName}
        size={40}
        color="#000"
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.vicinity}>{place.vicinity}</Text>
        <Text style={styles.rating}>Rating: {place.rating || 'N/A'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  vicinity: {
    color: '#555',
  },
  rating: {
    color: '#888',
  },
});

export default PlaceItem;
