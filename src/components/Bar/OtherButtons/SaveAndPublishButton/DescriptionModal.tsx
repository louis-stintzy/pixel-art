import useStore from '../../../../store/store';
import Modal from '../../../common/Modal';
import DescriptionModalContent from './DescriptionModalContent';
import { useIsDescriptionModalOpen } from '../../../../store/selectors/selector';
import { setIsDescriptionModalOpen } from '../../../../store/actions/storeActions';

function DescriptionModal() {
  const isDescriptionModalOpen = useIsDescriptionModalOpen();

  const handleClose = () => {
    setIsDescriptionModalOpen(false);
  };

  const descriptionModalStyle: React.CSSProperties = {
    width: '400px',
    height: '500px',
    margin: 'auto',
  };

  return (
    <Modal
      isOpen={isDescriptionModalOpen}
      modalStyle={descriptionModalStyle}
      onClose={handleClose}
    >
      <DescriptionModalContent />
    </Modal>
  );
}

export default DescriptionModal;
