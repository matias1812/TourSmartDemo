import { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import usePlacesStore from '../context/PlacesContext';

// Define the types of places you're interested in
const TOURIST_ATTRACTIONS_TYPES = 'amusement_park|park|tourist_attraction|natural_feature|museum|monument';
const OTHER_PLACES_TYPES = 'restaurant|lodging|motel';

const usePlaces = (latitude, longitude) => {
  const { addPlaces, getPlaces } = usePlacesStore(state => ({
    addPlaces: state.addPlaces,
    getPlaces: state.getPlaces,
  }));

  const [visitedPlaceIds, setVisitedPlaceIds] = useState(new Set());

  const fetchPlaces = useCallback(async (type) => {
    try {
      const response = await axios.get('https://vltdnxfz-5000.brs.devtunnels.ms/places', {
        params: {
          latitude: latitude,
          longitude: longitude,
          type: type,
        }
      });
      console.log('Fetched Places:', response.data);
      
      const newPlaces = response.data.filter(place => {
        if (visitedPlaceIds.has(place.place_id)) {
          return false;
        }
        visitedPlaceIds.add(place.place_id);
        return true;
      });
  
      if (newPlaces.length > 0) {
        addPlaces(newPlaces);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  }, [latitude, longitude, addPlaces, visitedPlaceIds]);

  useEffect(() => {
    if (latitude && longitude) {
      fetchPlaces(TOURIST_ATTRACTIONS_TYPES);
      fetchPlaces(OTHER_PLACES_TYPES);
    }

    // Optional: Limit the interval to prevent excessive requests
    const intervalId = setInterval(() => {
      if (latitude && longitude) {
        fetchPlaces(TOURIST_ATTRACTIONS_TYPES);
        fetchPlaces(OTHER_PLACES_TYPES);
      }
    }, 30000); // Every minute, adjust as needed

    return () => clearInterval(intervalId);
  }, [latitude, longitude, fetchPlaces]);

  useEffect(() => {
    const existingPlaces = getPlaces();
    const existingPlaceIds = new Set(existingPlaces.map(place => place.place_id));
    setVisitedPlaceIds(existingPlaceIds);
  }, [getPlaces]);
};

export default usePlaces;
