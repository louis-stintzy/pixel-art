import { Area } from 'react-easy-crop';

// note : https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Using_images

const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image)); // Lorsque l'image est chargée, la promesse est résolue avec l'élément image
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
};

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area
): Promise<string | undefined> => {
  // Créer une image à partir de l'URL
  const image = await createImage(imageSrc);

  // Créer un canvas pour dessiner l'image recadrée
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas ontext error');
  }

  // Définir les dimensions du canvas selon les dimensions du recadrage
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Dessiner l'image recadrée sur le canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

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

export default getCroppedImg;
