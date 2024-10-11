import { warningMessages } from '../../constants/messages';
import useStore from '../../store/store';
import Toast from '../common/Toast';

function ClearCanvasToast() {
  const clearCanvas = () => {
    useStore.getState().setIsClearCanvasToastVisible(false);
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
      onClose={() => useStore.getState().setIsClearCanvasToastVisible(false)}
      duration={5000}
    />
  );
}

export default ClearCanvasToast;
