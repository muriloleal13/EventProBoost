import { defineStore } from 'pinia';
import { LOCALE_STORAGE } from 'src/stores/storageConfig';

export type LangType = {
  lang: string;
};

const defaultData = { lang: 'en' };

const getLocaleStorage = () => {
  const storage = localStorage.getItem(LOCALE_STORAGE);
  const locale: LangType = storage ? JSON.parse(storage) : defaultData;

  return locale;
};

export const useLocaleStore = defineStore(LOCALE_STORAGE, {
  state: () => ({ localeData: getLocaleStorage() }),
  getters: {
    storeLocaleDataGetter(state) {
      return state.localeData;
    },
  },
  actions: {
    storageLocaleSave(locale: LangType) {
      this.localeData = locale;
      localStorage.setItem(LOCALE_STORAGE, JSON.stringify(this.localeData));
    },
    storageLocaleRemove() {
      this.localeData = defaultData;
      localStorage.removeItem(LOCALE_STORAGE);
    },
  },
});
