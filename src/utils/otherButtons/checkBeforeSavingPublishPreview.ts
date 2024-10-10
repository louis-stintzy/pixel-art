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
    throw new Error('Please log in to save');
  }
  if (pixelArtName.length < 3) {
    throw new Error('Pixel Art name must be at least 3 characters');
  }
};

export default checkBeforeSavingPublishPreview;
