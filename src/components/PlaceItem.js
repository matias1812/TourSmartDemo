import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PlaceItem = ({ place }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: place.icon }} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.address}>{place.vicinity}</Text>
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
    width: 40,
    height: 40,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  address: {
    color: '#555',
  },
  rating: {
    color: '#888',
  },
});

export default PlaceItem;
