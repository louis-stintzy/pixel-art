import Toast from '../common/Toast';
import contactMail from '../../constants/contactMail';
import { infoMessages } from '../../constants/messages';
import { setIsContactToastVisible } from '../../store/actions/storeActions';

function ContactToast() {
  const openMailClient = () => {
    window.open(`mailto:${contactMail}?subject=Pixel-Art-Maker`);
    setIsContactToastVisible(false);
  };
  return (
    <Toast
      type="info"
      message={infoMessages.emailCopyInfo}
      optionalButton={{ text: 'Open', onClick: openMailClient }}
      onClose={() => setIsContactToastVisible(false)}
      duration={5000}
    />
  );
}

export default ContactToast;
