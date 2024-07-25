import { create } from 'zustand';

type State = {
  userDragsGrid: boolean;
  gridSize: { width: number; height: number; pixelSize: number };
  selectedColor: string;
  pixelColors: Record<string, string>; // Record<Keys, Type>, Constructs an object type whose property keys are Keys and whose property values are Type.
  setUserDragsGrid: (userDragsGrid: boolean) => void;
  setGridSize: (gridSize: {
    width: number;
    height: number;
    pixelSize: number;
  }) => void;
  setSelectedColor: (selectedColor: string) => void;
  setPixelColors: (id: string, color: string) => void;
};

const useStore = create<State>()((set) => ({
  userDragsGrid: false,
  gridSize: { width: 8, height: 8, pixelSize: 30 },
  selectedColor: '#FFC107',
  pixelColors: {},
  setUserDragsGrid: (userDragsGrid) => set({ userDragsGrid }),
  setGridSize: (gridSize) => set({ gridSize }),
  setSelectedColor: (selectedColor) => set({ selectedColor }),
  setPixelColors: (id, color) =>
    set((state) => ({
      pixelColors: { ...state.pixelColors, [id]: color },
    })),
}));

export default useStore;
