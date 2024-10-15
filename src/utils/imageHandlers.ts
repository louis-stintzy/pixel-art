import { resetAspectRatio } from '../constants/aspectRatio';
import useStore from '../store/store';
import { getFileUrl } from '../store/selectors/selector';
import { setIsCroppingModalOpen } from '../store/actions/storeActions';

export const handleCropOrCancel = () => {
  const fileUrl = getFileUrl();
  const { setFileUrl } = useStore.getState();

  setIsCroppingModalOpen(false);
  if (fileUrl) {
    URL.revokeObjectURL(fileUrl);
  }
  setFileUrl(undefined);
};

export const handleCancel = () => {
  const { setAspectRatio } = useStore.getState();
  handleCropOrCancel();
  setAspectRatio(resetAspectRatio);
};
