import { create } from 'zustand';

type State = {
  userDragsGrid: boolean;
  gridSize: { width: number; height: number; pixelSize: number };
  setUserDragsGrid: (userDragsGrid: boolean) => void;
  setGridSize: (gridSize: {
    width: number;
    height: number;
    pixelSize: number;
  }) => void;
};

const useStore = create<State>()((set) => ({
  userDragsGrid: false,
  gridSize: { width: 8, height: 8, pixelSize: 30 },
  setUserDragsGrid: (userDragsGrid) => set({ userDragsGrid }),
  setGridSize: (gridSize) => set({ gridSize }),
}));

export default useStore;
