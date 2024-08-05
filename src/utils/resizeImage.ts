import { Format } from '../@types/aspectRatio';
import createImage from './createImage';

// const resizeImage2 = (file: File, maxWidth: number, maxHeight: number) => {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = (event) => {
//       const img = new Image();
//       img.src = event.target?.result as string;
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
//         const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
//         canvas.width = img.width * scale;
//         canvas.height = img.height * scale;
//         ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
//         canvas.toBlob((blob) => {
//           resolve(new File([blob as Blob], file.name, { type: file.type }));
//         }, file.type);
//       };
//     };
//   });
// };

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
