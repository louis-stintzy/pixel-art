import useStore from '../../store/store';
import Toast from '../common/Toast';

function SavingToast() {
  const { savingToastVisible, setSavingToastVisible } = useStore(
    (state) => state
  );
  if (!savingToastVisible.success && !savingToastVisible.error) {
    return null;
  }
  return (
    <Toast
      message={
        savingToastVisible.success
          ? 'Pixel art saved successfully !'
          : 'Failed to save pixel art'
      }
      backgroundColor={savingToastVisible.success ? 'green' : 'red'}
      onClose={() => setSavingToastVisible({ success: false, error: false })}
      duration={3000}
    />
  );
}

export default SavingToast;
