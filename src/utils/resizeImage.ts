import { Format } from '../@types/aspectRatio';
import createImage from './createImage';

const resizeImage = async (
  imageSrc: string,
  format: Format
): Promise<string | undefined> => {
  // Créer une image à partir de l'URL
  const image = await createImage(imageSrc);

  // Créer un canvas pour dessiner l'image redimensionnée
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas ontext error');
  }

  // Définir les dimensions du canvas selon les dimensions transmises
  canvas.width = format.width;
  canvas.height = format.height;

  // Dessiner l'image redimensionnée sur le canvas
  ctx.drawImage(image, 0, 0, format.width, format.height);

  // Convertir le canvas en blob et retourne une url
  return new Promise<string | undefined>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas to Blob Error'));
        return;
      }
      const url = URL.createObjectURL(blob);
      resolve(url);
    }, 'image/jpeg');
  });
};

export default resizeImage;
