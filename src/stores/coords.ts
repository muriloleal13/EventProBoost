import { defineStore } from 'pinia';
import { COORDS_STORAGE } from 'src/stores/storageConfig';

export type CoordType = {
  lat: number;
  lng: number;
};

const defaultData = {
  lat: -29.685345043931132,
  lng: -53.803557201898826,
};

const getCoordsStorage = () => {
  const storage = localStorage.getItem(COORDS_STORAGE);
  const coords: CoordType = storage ? JSON.parse(storage) : defaultData;
  return coords;
};

export const useCoordsStore = defineStore(COORDS_STORAGE, {
  state: () => ({ coordsData: getCoordsStorage() }),
  getters: {
    storeCoordsDataGetter(state) {
      return state.coordsData;
    },
  },
  actions: {
    storageCoordsSave(coords: CoordType) {
      this.coordsData = coords;
      localStorage.setItem(COORDS_STORAGE, JSON.stringify(this.coordsData));
    },
    storageCoordsRemove() {
      this.coordsData = defaultData;
      localStorage.removeItem(COORDS_STORAGE);
    },
  },
});
