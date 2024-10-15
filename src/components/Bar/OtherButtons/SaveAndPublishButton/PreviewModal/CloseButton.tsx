import Button from '../../../../common/Button';
import { closeIcon } from '../../../../../constants/icons';

interface CloseButtonProps {
  onClose: () => void;
}

function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <Button
      id="close-preview-modal-button"
      tooltip="Close preview"
      icon={{ src: closeIcon, alt: 'Close preview button' }}
      onClickButton={onClose}
    />
  );
}

export default CloseButton;
