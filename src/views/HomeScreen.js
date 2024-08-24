import React, { useState, useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import useLocation from '../hooks/useLocation';
import usePlaces from '../hooks/usePlaces';
import MapViewComponent from '../components/MapViewComponent';
import SearchBar from '../components/SearchBar';
import BottomSheetComponent from '../components/BottomSheetComponent';

export default function HomeScreen ({ navigation }) {
  const { location, errorMsg } = useLocation();
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState([]);
  const bottomSheetRef = useRef(null);

  if (errorMsg) {
    Alert.alert('Error', errorMsg);
  }

  usePlaces(location?.latitude, location?.longitude);

  if (!location) {
    return <View><Text>Loading location...</Text></View>; // Mostrar un mensaje mientras se carga la ubicación
  }

  const handleSearchPress = (data, details) => {
    const { lat, lng } = details.geometry.location;
    setDestination({ latitude: lat, longitude: lng });
  };

  const handleMarkerPress = (place) => {
    bottomSheetRef.current?.expand();
  };

  return (
    <View style={{ flex: 1 }}>
      {location && (
        <MapViewComponent
          location={location}
          destination={destination}
          route={route}
          onMarkerPress={handleMarkerPress}
        />
      )}
      <SearchBar onPress={handleSearchPress} />
      <BottomSheetComponent ref={bottomSheetRef} />
    </View>
  );
};
