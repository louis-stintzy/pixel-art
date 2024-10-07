import useStore from '../store/store';
import contactMail from './contactMail';
import { trashIcon, saveIcon, publishIcon, contactIcon } from './icons';
import { getUser, getIsLogged } from '../store/selector';

const buttonStyle = {};
const isLogged = getIsLogged();

const handleClickClearButton = () => {
  useStore.getState().setIsClearCanvasToastVisible(true);
};

const handleClickSaveOrPublishButton = (buttonRole: 'save' | 'publish') => {
  try {
    const user = getUser();
    if (!isLogged || !user) {
      throw new Error(`Please log in to ${buttonRole}`);
    }
    useStore.getState().setClickedButton(buttonRole);
    useStore.getState().setIsDescriptionModalOpen(true);
  } catch (error) {
    console.error('Failed to save pixel art:', error);
    useStore
      .getState()
      .setIsSavingToastVisible({ success: false, error: true });
  }
};

const handleClickContactButton = async () => {
  try {
    await navigator.clipboard.writeText(contactMail);
    useStore.getState().setIsContactToastVisible(true);
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
    onClickButton: handleClickClearButton,
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
    disabled: !isLogged,
    onClickButton: () => handleClickSaveOrPublishButton('save'),
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
    disabled: !isLogged,
    onClickButton: () => handleClickSaveOrPublishButton('publish'),
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
