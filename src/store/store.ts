import { create } from 'zustand';

type State = {
  gridSize: { width: number; height: number; pixelSize: number };
  setGridSize: (gridSize: {
    width: number;
    height: number;
    pixelSize: number;
  }) => void;
};

const useStore = create<State>()((set) => ({
  gridSize: { width: 8, height: 8, pixelSize: 30 },
  setGridSize: (gridSize) => set({ gridSize }),
}));

export default useStore;
