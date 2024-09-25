import { resetAspectRatio } from '../constants/aspectRatio';
import useStore from '../store/store';

export const handleCropOrCancel = () => {
  const { fileUrl, setIsCroppingModalOpen, setFileUrl } = useStore.getState();

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
