import { defineStore } from 'pinia';
import { USER_STORAGE } from 'src/stores/storageConfig';

export type UserType = {
  id: number;
  name: string;
  email: string;
  type: number;
};

const defaultData = { id: -1, name: '', email: '', type: -1 };

const getUserStorage = () => {
  const storage = localStorage.getItem(USER_STORAGE);
  const user: UserType = storage ? JSON.parse(storage) : defaultData;

  return user;
};

export const useUserStore = defineStore(USER_STORAGE, {
  state: () => ({ userData: getUserStorage() }),
  getters: {
    storeUserDataGetter(state) {
      return state.userData;
    },
  },
  actions: {
    storageUserSave(user: UserType) {
      this.userData = user;
      localStorage.setItem(USER_STORAGE, JSON.stringify(this.userData));
    },
    storageUserRemove() {
      this.userData = defaultData;
      localStorage.removeItem(USER_STORAGE);
    },
  },
});
