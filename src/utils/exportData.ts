import useStore from '../store/store';
import version from '../constants/version';

const exportData = () => {
  try {
    const {
      user,
      pixelArtDescription,
      gridSize,
      gridColor,
      pixelColors,
      imageUrl,
    } = useStore.getState();

    if (!user) {
      console.log('Please log in to save your pixel art');
      return;
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
    console.log('data:', data);
  } catch (error) {
    console.error('Failed to export data:', error);
  }
};

export default exportData;
