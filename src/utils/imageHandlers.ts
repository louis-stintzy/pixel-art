import { resetAspectRatio } from '../constants/aspectRatio';
import useStore from '../store/store';

export const handleCropOrCancel = () => {
  const { fileUrl, setCroppingModalIsOpen, setFileUrl } = useStore.getState();

  setCroppingModalIsOpen(false);
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
