import version from '../../constants/version';
import {
  getUser,
  getIsLogged,
  getGridSize,
  getGridColor,
  getPixelColors,
  getImageUrl,
  getDescriptionFields,
  getGridOptionSelected,
} from '../../store/selector';
import useStore from '../../store/store';

const exportData = () => {
  // Est ce qu'on peut placer useStore.getState().cleanPixelColors() direct ici et récupérer pixelColors "cleané" ? Oui (normalement), car useStore.getState().cleanPixelColors() est synchrone
  useStore.getState().cleanPixelColors();
  const user = getUser();
  const isLogged = getIsLogged();
  const gridSize = getGridSize();
  const gridColor = getGridColor();
  const pixelColors = getPixelColors();
  const imageUrl = getImageUrl();
  const { name, description } = getDescriptionFields();
  const gridOptionSelected = getGridOptionSelected();

  try {
    // todo: Remplacer par checkBeforeSavingPublishPreview avec un paramètre save | publish | preview afin de personnaliser l'erreur (à voir avec la centralisation des erreurs)
    if (!isLogged || !user) {
      throw new Error('Please log in to export');
    }
    if (name.length < 3) {
      throw new Error('Pixel Art name must be at least 3 characters');
    }

    const tokenDatePart = `T${Date.now().toString()}`;
    const tokenUserPart = `U${user.id.toString().padStart(7, '0')}`;
    const tokenNamePart = `N${name
      .substring(0, 5)
      .toUpperCase()
      .padStart(5, 'X')}`;
    const tokenRandomPart = `R${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0')}`;
    const pixelArtToken = `${tokenDatePart}${tokenUserPart}${tokenNamePart}${tokenRandomPart}`;

    const date = new Date().toISOString();

    const data = {
      pixelArtToken,
      user,
      name,
      description,
      gridSize,
      gridColor,
      gridPrinting: gridOptionSelected,
      pixelColors,
      imageUrl,
      date,
      version,
    };
    return data;
  } catch (error) {
    console.error('Failed to export data:', error);
    throw new Error('Failed to export data');
  }
};

export default exportData;
