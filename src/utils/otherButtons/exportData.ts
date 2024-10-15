import version from '../../constants/version';
import {
  getUser,
  getGridSize,
  getGridColor,
  getPixelColors,
  getImageUrl,
  getDescriptionFields,
  getGridOptionSelected,
} from '../../store/selectors/selector';
import useStore from '../../store/store';

const exportData = () => {
  // Est ce qu'on peut placer useStore.getState().cleanPixelColors() direct ici et récupérer pixelColors "cleané" ?
  useStore.getState().cleanPixelColors(); // Oui (normalement), car useStore.getState().cleanPixelColors() est synchrone

  const user = getUser();
  if (!user) throw new Error('User not found'); // En amont, checkBeforeSavingPublishPreview a déjà vérifié que l'utilisateur était connecté. Cette erreur ne devrait donc jamais se produire. Cette ligne évite des erreurs dans le code.
  const gridSize = getGridSize();
  const gridColor = getGridColor();
  const pixelColors = getPixelColors();
  const imageUrl = getImageUrl();
  const { name, description } = getDescriptionFields();
  const gridOptionSelected = getGridOptionSelected();

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
};

export default exportData;
