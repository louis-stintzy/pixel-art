import { warningMessages } from '../../constants/messages';
import {
  resetPixelColors,
  setIsClearCanvasToastVisible,
} from '../../store/actions/storeActions';
import Toast from '../common/Toast';

function ClearCanvasToast() {
  const clearCanvas = () => {
    setIsClearCanvasToastVisible(false);
    resetPixelColors();
  };

  return (
    <Toast
      type="warning"
      message={warningMessages.clearCanvasWarning}
      optionalButton={{
        text: 'Yes',
        onClick: clearCanvas,
      }}
      onClose={() => setIsClearCanvasToastVisible(false)}
      duration={5000}
    />
  );
}

export default ClearCanvasToast;
