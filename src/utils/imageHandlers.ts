import { resetAspectRatio } from '../constants/aspectRatio';
import { getFileUrl } from '../store/selectors/selector';
import {
  setAspectRatio,
  setFileUrl,
  setIsCroppingModalOpen,
} from '../store/actions/storeActions';

export const handleCropOrCancel = () => {
  const fileUrl = getFileUrl();

  setIsCroppingModalOpen(false);
  if (fileUrl) {
    URL.revokeObjectURL(fileUrl);
  }
  setFileUrl(undefined);
};

export const handleCancel = () => {
  handleCropOrCancel();
  setAspectRatio(resetAspectRatio);
};
