import useStore from '../../../store/store';
import Modal from '../../common/Modal';
import DescriptionModalContent from './DescriptionModalContent';

function DescriptionModal() {
  const { descriptionModalIsOpen } = useStore((state) => state);

  const handleClose = () => {
    useStore.getState().setDescriptionModalIsOpen(false);
  };

  const descriptionModalStyle: React.CSSProperties = {
    width: '400px',
    height: '500px',
    margin: 'auto',
  };

  return (
    <Modal
      isOpen={descriptionModalIsOpen}
      modalStyle={descriptionModalStyle}
      onClose={handleClose}
    >
      <DescriptionModalContent />
    </Modal>
  );
}

export default DescriptionModal;
