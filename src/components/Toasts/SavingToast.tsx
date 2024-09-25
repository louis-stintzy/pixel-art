import useStore from '../../store/store';
import { useIsSavingToastVisible } from '../../store/selector';
import Toast from '../common/Toast';

function SavingToast() {
  const { setIsSavingToastVisible } = useStore((state) => state);
  const isSavingToastVisible = useIsSavingToastVisible();
  if (!isSavingToastVisible.success && !isSavingToastVisible.error) {
    return null;
  }
  return (
    <Toast
      type={isSavingToastVisible.success ? 'success' : 'error'}
      message={
        isSavingToastVisible.success
          ? 'Pixel art saved successfully !'
          : 'Failed to save pixel art'
      }
      onClose={() => setIsSavingToastVisible({ success: false, error: false })}
      duration={3000}
    />
  );
}

export default SavingToast;
