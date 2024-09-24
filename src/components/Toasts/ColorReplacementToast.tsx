import useStore from '../../store/store';
import Toast from '../common/Toast';

function ColorReplacementToast() {
  const undoColorReplacement = () => {
    const { savedPixelColors } = useStore.getState().colorReplacement;
    if (savedPixelColors)
      useStore.getState().setPixelColorsBackup(savedPixelColors);
    useStore.getState().setColorReplacement({ toastVisible: false });
  };
  return (
    <Toast
      type="info"
      message="Color change applied. Do you want to undo ?"
      optionalButton={{ text: 'Undo', onClick: undoColorReplacement }}
      onClose={() =>
        useStore.getState().setColorReplacement({ toastVisible: false })
      }
      duration={10000}
    />
  );
}

export default ColorReplacementToast;
