import useStore from '../../store/store';
import Toast from '../common/Toast';
import { useSavedPixelColorsBeforeColorReplacement } from '../../store/selector';

function ColorReplacementToast() {
  const savedPixelColors = useSavedPixelColorsBeforeColorReplacement();
  const undoColorReplacement = () => {
    if (savedPixelColors)
      useStore.getState().setPixelColorsBackup(savedPixelColors);
    useStore.getState().setIsColorReplacementToastVisible(false);
  };
  return (
    <Toast
      type="info"
      message="Color change applied. Do you want to undo ?"
      optionalButton={{ text: 'Undo', onClick: undoColorReplacement }}
      onClose={() =>
        useStore.getState().setIsColorReplacementToastVisible(false)
      }
      duration={10000}
    />
  );
}

export default ColorReplacementToast;
