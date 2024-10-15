import useStore from '../store/store';
import contactMail from './contactMail';
import { trashIcon, saveIcon, publishIcon, contactIcon } from './icons';
import { getUser, getIsLogged } from '../store/selectors/selector';
import { errorMessages } from './messages';
import {
  setClickedButton,
  setIsClearCanvasToastVisible,
  setIsContactToastVisible,
  setIsSavingPublishingPreviewingToastVisible,
} from '../store/actions/storeActions';

const buttonStyle = {};
const isLogged = getIsLogged();

const handleClickClearButton = () => {
  useStore.getState().closeAllToasts();
  setIsClearCanvasToastVisible(true);
};

const handleClickSaveOrPublishButton = (buttonRole: 'save' | 'publish') => {
  try {
    const user = getUser();
    if (!isLogged || !user) {
      throw new Error(errorMessages.mustBeLoggedIn);
    }
    setClickedButton(buttonRole);
    useStore.getState().setIsDescriptionModalOpen(true);
  } catch (error) {
    console.error(
      buttonRole === 'save'
        ? errorMessages.savingModalOpeningError
        : errorMessages.publishingModalOpeningError,
      error
    );
    useStore.getState().closeAllToasts();
    setIsSavingPublishingPreviewingToastVisible({
      success: false,
      error: true,
      message:
        error instanceof Error ? error.message : errorMessages.unexpectedError,
    });
  }
};

const handleClickContactButton = async () => {
  try {
    await navigator.clipboard.writeText(contactMail);
    useStore.getState().closeAllToasts();
    setIsContactToastVisible(true);
  } catch (error) {
    console.error(errorMessages.emailCopyError, error);
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
