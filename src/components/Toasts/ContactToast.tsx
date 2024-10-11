import useStore from '../../store/store';
import Toast from '../common/Toast';
import contactMail from '../../constants/contactMail';
import { successMessages } from '../../constants/errorAndSuccesMessages';

function ContactToast() {
  const openMailClient = () => {
    window.open(`mailto:${contactMail}?subject=Pixel-Art-Maker`);
    useStore.getState().setIsContactToastVisible(false);
  };
  return (
    <Toast
      type="info"
      message={successMessages.emailCopySuccess}
      optionalButton={{ text: 'Open', onClick: openMailClient }}
      onClose={() => useStore.getState().setIsContactToastVisible(false)}
      duration={5000}
    />
  );
}

export default ContactToast;
