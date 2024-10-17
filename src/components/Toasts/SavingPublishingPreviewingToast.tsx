import { setIsSavingPublishingPreviewingToastVisible } from '../../store/actions/storeActions';
import { useIsSavingPublishingPreviewingToastVisible } from '../../store/selectors/selector';
import Toast from '../common/Toast';

function SavingPublishingPreviewingToast() {
  const isSavingPublishingPreviewingToastVisible =
    useIsSavingPublishingPreviewingToastVisible();
  if (
    !isSavingPublishingPreviewingToastVisible.success &&
    !isSavingPublishingPreviewingToastVisible.error &&
    !isSavingPublishingPreviewingToastVisible.message
  ) {
    return null;
  }
  return (
    <Toast
      type={
        isSavingPublishingPreviewingToastVisible.success ? 'success' : 'error'
      }
      message={isSavingPublishingPreviewingToastVisible.message}
      onClose={() =>
        setIsSavingPublishingPreviewingToastVisible({
          success: false,
          error: false,
          message: '',
        })
      }
      duration={5000}
    />
  );
}

export default SavingPublishingPreviewingToast;
