import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '../config';

const SearchBar = ({ onPress }) => {

  const handlePress = (data, details) => {
    if (!details || !details.geometry || !details.geometry.location) {
      console.error('No location data available');
      return;
    }

    const { lat, lng } = details.geometry.location;
    const place = {
      place_id: data.place_id,
      name: data.structured_formatting.main_text,
      vicinity: data.structured_formatting.secondary_text,
      geometry: {
        location: { lat, lng }
      },
      icon: data.icon,
      rating: data.rating
    };

    onPress(place); // Handle place selection
  };

  return (
    <GooglePlacesAutocomplete
      placeholder='Search for places'
      onPress={handlePress}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: 'en',
      }}
      styles={{
        container: {
          flex: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
        },
        textInputContainer: {
          backgroundColor: 'white',
          borderRadius: 5,
          margin: 10,
        },
        textInput: {
          height: 40,
          borderRadius: 5,
          paddingHorizontal: 10,
        },
      }}
    />
  );
};

export default SearchBar;
