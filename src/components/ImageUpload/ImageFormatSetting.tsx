import { useState } from 'react';
import { avaibleAspectRatios } from '../../constants/aspectRatio';
import useStore from '../../store/store';
import { AspectRatio, Orientation } from '../../@types/aspectRatio';

function ImageFormatSetting() {
  // Récupère aspectRatio  (état global) et setAspectRatio du store
  const aspectRatio = useStore((state) => state.aspectRatio);
  const setAspectRatio = useStore((state) => state.setAspectRatio);
  // Stocke l'orientation (inialisé à 'landscape' car aspectRatio est initialisé à '4:3' dans le store) et l'aspect ratio actuel (état local)
  const [orientation, setOrientation] = useState<Orientation>('landscape');
  const [aspect, setAspect] = useState<AspectRatio>(aspectRatio);

  // Fonction pour changer l'orientation et/ou l'aspect ratio
  const handleChangeAspect =
    (aspectType: 'orientation' | 'aspectRatio') =>
    (value: Orientation | AspectRatio) => {
      // console.log('aspect', aspect);
      // console.log('value', value);
      if (aspectType === 'orientation') {
        const newOrientation = value as Orientation;
        setOrientation(newOrientation);

        // Calcul du nouveau ratio en fonction de l'orientation actuelle et de la nouvelle orientation
        let newRatio = 1;

        // Inverse le ratio si l'orientation passe de paysage à portrait ou vice versa
        if (
          (newOrientation === 'landscape' && orientation === 'portrait') ||
          (newOrientation === 'portrait' && orientation === 'landscape')
        ) {
          newRatio = 1 / aspect.value;
        }

        // Définit le ratio par défaut en fonction de la nouvelle orientation
        if (newOrientation === 'square') newRatio = 1;
        if (newOrientation === 'landscape' && orientation !== 'portrait')
          newRatio = 4 / 3; // 4:3 pour rester cohérent avec l'initialisation de aspectRatio dans le store
        if (newOrientation === 'portrait' && orientation !== 'landscape')
          newRatio = 3 / 4; // 3:4 pour rester cohérent avec le commentaire précédent (cas inverse)
        if (newOrientation === 'panoramic') newRatio = 65 / 24;
        // console.log('ratio', aspect.value);
        // console.log('newRatio', newRatio);

        // Recherche du nouvel aspect ratio en fonction de la nouvelle orientation (et du nouveau ratio calculé)
        const newAspectRatio = avaibleAspectRatios[newOrientation].find(
          (ar: AspectRatio) => newRatio === ar.value
        ) as AspectRatio;
        setAspect(newAspectRatio);
        setAspectRatio(newAspectRatio);
      }
      if (aspectType === 'aspectRatio') {
        const newAspectRatio = value as AspectRatio;
        // console.log('ratio', aspect.value);
        // console.log('newAspectRatio.value', newAspectRatio.value);
        setAspect(newAspectRatio);
        setAspectRatio(newAspectRatio);
      }
    };

  return (
    <div>
      <label>
        Orientation:
        <select
          name="orientation"
          value={orientation}
          onChange={(e) =>
            handleChangeAspect('orientation')(e.target.value as Orientation)
          }
        >
          {Object.keys(avaibleAspectRatios).map((avaibleOrientation) => (
            <option key={avaibleOrientation} value={avaibleOrientation}>
              {avaibleOrientation}
            </option>
          ))}
        </select>
      </label>
      <label>
        Aspect ratio:
        <select
          name="ratio"
          value={aspect.display}
          onChange={(e) =>
            handleChangeAspect('aspectRatio')(
              avaibleAspectRatios[orientation].find(
                (ar: AspectRatio) => ar.display === e.target.value
              ) as AspectRatio
            )
          }
        >
          {avaibleAspectRatios[orientation].map((ar: AspectRatio) => (
            <option key={ar.display} value={ar.display}>
              {ar.display}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default ImageFormatSetting;
