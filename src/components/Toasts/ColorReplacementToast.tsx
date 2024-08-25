import useStore from '../../store/store';
import Toast from './Toast';

function ColorReplacementToast() {
  const undoColorReplacement = () => {
    const { savedPixelColors } = useStore.getState().colorReplacement;
    if (savedPixelColors) useStore.getState().setPixelColors(savedPixelColors);
    useStore.getState().setColorReplacement({ toastVisible: false });
  };
  return (
    <Toast
      message="Color change applied. Do you want to undo?"
      onUndo={undoColorReplacement}
      onClose={() =>
        useStore.getState().setColorReplacement({ toastVisible: false })
      }
      duration={10000}
    />
  );
}

export default ColorReplacementToast;
