import useStore from '../store/store';
import version from '../constants/version';
import { getUser, getIsLogged, getImageUrl } from '../store/selector';

const exportData = () => {
  const user = getUser();
  const isLogged = getIsLogged();
  const imageUrl = getImageUrl();

  try {
    const { pixelArtDescription, gridSize, gridColor, pixelColors } =
      useStore.getState();

    if (!isLogged || !user) {
      throw new Error('Please log in to export');
    }

    const pixelArtToken = `T${Date.now().toString()}-U${user.id}-R${Math.floor(
      Math.random() * 1000
    )}`;

    const date = new Date().toISOString();

    const data = {
      pixelArtToken,
      user,
      pixelArtDescription,
      gridSize,
      gridColor,
      pixelColors,
      imageUrl,
      date,
      version,
    };
    const dataJsonStr = JSON.stringify(data, null, 2);
    console.log('data:', dataJsonStr);
  } catch (error) {
    console.error('Failed to export data:', error);
    throw new Error('Failed to export data');
  }
};

export default exportData;
