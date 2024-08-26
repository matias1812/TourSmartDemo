import { useEffect, useCallback } from 'react';
import axios from 'axios';

const TOURIST_ATTRACTIONS_TYPES = 'amusement_park|park|tourist_attraction|natural_feature|museum|monument';
const OTHER_PLACES_TYPES = 'restaurant|lodging|motel';

const usePlaces = (latitude, longitude, onUpdatePlaces) => {
  const fetchPlaces = useCallback(async (type) => {
    try {
      const response = await axios.get('https://vltdnxfz-8000.brs.devtunnels.ms/places', {
        params: {
          latitude: latitude,
          longitude: longitude,
          type: type,
        }
      });
      
      if (response.data.length > 0) {
        onUpdatePlaces(response.data); // Call the provided callback with fetched places
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  }, [latitude, longitude, onUpdatePlaces]);

  useEffect(() => {
    if (latitude && longitude) {
      fetchPlaces(TOURIST_ATTRACTIONS_TYPES);
      fetchPlaces(OTHER_PLACES_TYPES);
    }

    const intervalId = setInterval(() => {
      if (latitude && longitude) {
        fetchPlaces(TOURIST_ATTRACTIONS_TYPES);
        fetchPlaces(OTHER_PLACES_TYPES);
      }
    }, 3000000); // Adjust as necessary

    return () => clearInterval(intervalId);
  }, [latitude, longitude, fetchPlaces]);
};

export default usePlaces;
