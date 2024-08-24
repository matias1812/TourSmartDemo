import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import usePlacesStore from '../context/PlacesContext';
import { GOOGLE_MAPS_APIKEY } from '../config';

const MapViewComponent = ({ location, destination, route, onMarkerPress }) => {
  const places = usePlacesStore(state => state.places);
  
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="You are here" />
      
      {destination && (
        <>
          <Marker coordinate={destination} title="Destination" />
          <MapViewDirections
            origin={{ latitude: location.latitude, longitude: location.longitude }}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            onReady={result => {
              setRoute(result.coordinates);
            }}
          />
        </>
      )}
      
      {route.length > 0 && (
        <Polyline
          coordinates={route}
          strokeColor="hotpink"
          strokeWidth={3}
        />
      )}

      {places.map((place, index) => (
        <Marker
          key={`${place.place_id}-${index}`}
          coordinate={{
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          }}
          title={place.name}
          description={`${place.vicinity}\nPuntuación: ${place.rating || 'N/A'}`}
          icon={{ uri: place.icon }}
          onPress={() => onMarkerPress(place)}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapViewComponent;
