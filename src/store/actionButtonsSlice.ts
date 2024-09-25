import { StateCreator } from 'zustand';

export interface ActionButtonsSlice {
  isReadyToDraw: boolean;
  isEraser: boolean;
  isBigTool: boolean;
  colorReplacement: {
    isSelectingColor: boolean;
    targetColor: string | undefined;
    savedPixelColors: Record<string, string> | undefined;
    isLoading: boolean;
  };
  isImageHidden: boolean;
  setIsReadyToDraw: (isReadyToDraw: boolean) => void;
  setIsEraser: (isEraser: boolean) => void;
  setIsBigTool: (isBigTool: boolean) => void;
  setColorReplacement: (newState: {
    isSelectingColor?: boolean;
    targetColor?: string | undefined;
    savedPixelColors?: Record<string, string> | undefined;
    isLoading?: boolean;
  }) => void;
  setIsImageHidden: (isImageHidden: boolean) => void;
}

const createActionButtonsSlice: StateCreator<ActionButtonsSlice> = (set) => ({
  isReadyToDraw: false,
  isEraser: false,
  isBigTool: false,
  colorReplacement: {
    isSelectingColor: false,
    targetColor: undefined,
    savedPixelColors: undefined,
    isLoading: false,
  },
  isImageHidden: false,
  setIsReadyToDraw: (isReadyToDraw) => set({ isReadyToDraw }),
  setIsEraser: (isEraser) => set({ isEraser }),
  setIsBigTool: (isBigTool) => set({ isBigTool }),
  setColorReplacement: (newState) =>
    set((state) => ({
      colorReplacement: {
        ...state.colorReplacement,
        ...newState,
      },
    })),
  setIsImageHidden: (isImageHidden) => set({ isImageHidden }),
});

export default createActionButtonsSlice;
