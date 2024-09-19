import {
  trashIcon,
  saveIcon,
  publishIcon,
  contactIcon,
} from '../../../constants/icons';
import useStore from '../../../store/store';
import contactMail from '../../../constants/contactMail';

function OtherButtons() {
  const handleClickContactButton = async () => {
    const { setContactToastVisible } = useStore.getState();
    try {
      await navigator.clipboard.writeText(contactMail);
      setContactToastVisible(true);
    } catch (error) {
      console.error('Failed to copy email:', error);
      alert('Failed to copy email. Please try again.');
    }
  };
  const otherButtonsStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '3px',
  };
  return (
    <div id="other-buttons" style={otherButtonsStyle}>
      <button type="button" id="other-buttons__clear" disabled>
        <img src={trashIcon} alt="Trash icon" />
      </button>
      <button type="button" id="other-buttons__save" disabled>
        <img src={saveIcon} alt="Save icon" />
      </button>
      <button type="button" id="other-buttons__publish" disabled>
        <img src={publishIcon} alt="Publish icon" />
      </button>
      <button
        type="button"
        id="other-buttons__contact"
        onClick={handleClickContactButton}
      >
        <img src={contactIcon} alt="Contact icon" />
      </button>
    </div>
  );
}

export default OtherButtons;
