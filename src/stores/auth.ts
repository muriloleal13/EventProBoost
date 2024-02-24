import { defineStore } from 'pinia';
import { AUTH_STORAGE } from 'src/stores/storageConfig';

export type StorageAuthTokenProps = {
  accessToken: string;
};

const defaultData = { accessToken: '', refreshToken: '' };

const getAuthStorage = () => {
  const response = localStorage.getItem(AUTH_STORAGE);
  const data: StorageAuthTokenProps = response
    ? JSON.parse(response)
    : defaultData;
  return data;
};

export const useAuthStore = defineStore(AUTH_STORAGE, {
  state: () => ({
    dataAuth: getAuthStorage(),
  }),
  getters: {
    storeAuthTokenGetter(state) {
      return state.dataAuth.accessToken;
    },
  },
  actions: {
    storageAuthTokenSave(newDataAuth: StorageAuthTokenProps) {
      this.dataAuth = newDataAuth;
      localStorage.setItem(AUTH_STORAGE, JSON.stringify(this.dataAuth));
    },
    storageAuthTokenRemove() {
      this.dataAuth = defaultData;
      localStorage.removeItem(AUTH_STORAGE);
    },
  },
});
