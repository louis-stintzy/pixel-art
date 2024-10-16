import Toast from '../common/Toast';
import { useSavedPixelColorsBeforeColorReplacement } from '../../store/selectors/selector';
import { infoMessages } from '../../constants/messages';
import {
  setIsColorReplacementToastVisible,
  setPixelColorsBackup,
} from '../../store/actions/storeActions';

function ColorReplacementToast() {
  const savedPixelColors = useSavedPixelColorsBeforeColorReplacement();
  const undoColorReplacement = () => {
    if (savedPixelColors) setPixelColorsBackup(savedPixelColors);
    setIsColorReplacementToastVisible(false);
  };
  return (
    <Toast
      type="info"
      message={infoMessages.colorChangeInfo}
      optionalButton={{ text: 'Undo', onClick: undoColorReplacement }}
      onClose={() => setIsColorReplacementToastVisible(false)}
      duration={10000}
    />
  );
}

export default ColorReplacementToast;
