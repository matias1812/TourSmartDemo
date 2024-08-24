import { create } from 'zustand';

const usePlacesStore = create((set, get) => ({
  places: [],
  addPlaces: (newPlaces) => set((state) => ({
    places: [...state.places, ...newPlaces],
  })),
  getPlaces: () => get().places, // Use get() provided by zustand
}));

export default usePlacesStore;
