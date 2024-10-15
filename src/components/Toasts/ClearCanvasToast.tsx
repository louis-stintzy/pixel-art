import { warningMessages } from '../../constants/messages';
import { setIsClearCanvasToastVisible } from '../../store/actions/storeActions';
import useStore from '../../store/store';
import Toast from '../common/Toast';

function ClearCanvasToast() {
  const clearCanvas = () => {
    setIsClearCanvasToastVisible(false);
    useStore.getState().resetPixelColors();
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
