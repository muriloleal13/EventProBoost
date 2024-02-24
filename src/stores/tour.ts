import { defineStore } from 'pinia';
import { TOUR_STORAGE } from 'src/stores/storageConfig';

export type TourType = {
  id: number;
  label: string;
  done: boolean;
}[];

const defaultData = [
  {
    id: 0,
    label: 'Tour de Apresentação da Plataforma',
    done: false,
    showAgain: true,
  },
  { id: 1, label: 'Tour de Interface', done: false, showAgain: true },
  { id: 2, label: 'Primeira Consulta na Plataforma', done: false },
  { id: 3, label: 'Primeiro Evento Gerado na Plataforna', done: false },
];

const getTourStorage = () => {
  const storage = localStorage.getItem(TOUR_STORAGE);
  const tour: TourType = storage ? JSON.parse(storage) : defaultData;
  return tour;
};

export const useTourStore = defineStore(TOUR_STORAGE, {
  state: () => ({ tourData: getTourStorage() }),
  getters: {
    storeTourDataGetter(state) {
      return state.tourData;
    },
  },
  actions: {
    storageTourSave(tour: TourType) {
      this.tourData = tour;
      localStorage.setItem(TOUR_STORAGE, JSON.stringify(this.tourData));
    },
    storageTourRemove() {
      this.tourData = defaultData;
      localStorage.removeItem(TOUR_STORAGE);
    },
  },
});
