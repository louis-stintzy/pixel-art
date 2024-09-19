import useStore from '../store/store';
import contactMail from './contactMail';
import { trashIcon, saveIcon, publishIcon, contactIcon } from './icons';

const buttonStyle = {};

const handleClickSaveBbutton = () => {
  const { isLogged } = useStore.getState();
  if (!isLogged) {
    console.log('Please log in to save your pixel art');
    return;
  }
  useStore.getState().setDescriptionModalIsOpen(true);
};

const handleClickContactButton = async () => {
  const { setContactToastVisible } = useStore.getState();
  try {
    await navigator.clipboard.writeText(contactMail);
    setContactToastVisible(true);
  } catch (error) {
    console.error('Failed to copy email:', error);
  }
};

const otherButtons = [
  // ----- Clear the canvas -----
  {
    id: 'other-buttons__clear',
    buttonStyle,
    tooltip: 'Clear the canvas',
    icon: {
      src: trashIcon,
      alt: 'Trash icon',
    },
    disabled: true,
    onClickButton: () => {
      console.log('Clear the canvas');
    },
  },
  // ----- Save your pixel art -----
  {
    id: 'other-buttons__save',
    buttonStyle,
    tooltip: 'Save your pixel art',
    icon: {
      src: saveIcon,
      alt: 'Save icon',
    },
    onClickButton: handleClickSaveBbutton,
  },
  // ----- Publish your pixel art -----
  {
    id: 'other-buttons__publish',
    buttonStyle,
    tooltip: 'Publish your pixel art',
    icon: {
      src: publishIcon,
      alt: 'Publish icon',
    },
    disabled: true,
    onClickButton: () => {
      console.log('Publish your pixel art');
    },
  },
  // ----- Contact the developer -----
  {
    id: 'other-buttons__contact',
    buttonStyle,
    tooltip: 'Contact the developer',
    icon: {
      src: contactIcon,
      alt: 'Contact icon',
    },
    onClickButton: handleClickContactButton,
  },
];

export default otherButtons;
