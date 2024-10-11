import useStore from '../../store/store';
import Toast from '../common/Toast';
import { useSavedPixelColorsBeforeColorReplacement } from '../../store/selector';
import { infoMessages } from '../../constants/messages';

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
      message={infoMessages.colorChangeInfo}
      optionalButton={{ text: 'Undo', onClick: undoColorReplacement }}
      onClose={() =>
        useStore.getState().setIsColorReplacementToastVisible(false)
      }
      duration={10000}
    />
  );
}

export default ColorReplacementToast;
