import { StateCreator } from 'zustand';

export interface UserSlice {
  user:
    | {
        id: string;
        username: string;
      }
    | undefined;
  isLogged: boolean;
  setUser: (user: UserSlice['user']) => void;
  setIsLogged: (isLogged: boolean) => void;
}

const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: {
    id: '1',
    username: 'Rachel Lopez',
  },
  isLogged: true,
  setUser: (user) => set({ user }),
  setIsLogged: (isLogged) => set({ isLogged }),
});

export default createUserSlice;
