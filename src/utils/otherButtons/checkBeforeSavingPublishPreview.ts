import { errorMessages } from '../../constants/errorAndSuccesMessages';
import {
  getUser,
  getIsLogged,
  getDescriptionFields,
} from '../../store/selector';

const checkBeforeSavingPublishPreview = () => {
  const user = getUser();
  const isLogged = getIsLogged();
  const pixelArtName = getDescriptionFields().name;

  if (!isLogged || !user) {
    throw new Error(errorMessages.mustBeLoggedIn);
  }
  if (pixelArtName.length < 3) {
    throw new Error(errorMessages.pixelArtNameTooShort);
  }
  return user;
};

export default checkBeforeSavingPublishPreview;
