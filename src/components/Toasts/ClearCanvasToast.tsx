import useStore from '../../store/store';
import Toast from '../common/Toast';

function ClearCanvasToast() {
  const clearCanvas = () => {
    useStore.getState().setClearCanvasToastVisible(false);
    useStore.getState().resetPixelColors();
  };

  return (
    <Toast
      message="Are you sure you want to clear the canvas ?"
      optionalButton={{
        text: 'Yes',
        onClick: clearCanvas,
      }}
      backgroundColor="yellow"
      onClose={() => useStore.getState().setClearCanvasToastVisible(false)}
      duration={5000}
    />
  );
}

export default ClearCanvasToast;
