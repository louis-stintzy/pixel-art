import { useState } from 'react';
import avaibleAspectRatio, {
  Orientation,
  AspectRatio,
} from '../../constants/aspectRatio';
import useStore from '../../store/store';

function ImageFormatSetting() {
  const aspectRatio = useStore((state) => state.aspectRatio);
  const setAspectRatio = useStore((state) => state.setAspectRation);
  const [orientation, setOrientation] = useState<Orientation>('landscape'); // inialisé à 'landscape' car aspectRatio est initialisé à '4:3' dans le store
  // const [ratio, setRatio] = useState<number>(4 / 3);
  const [aspect, setAspect] = useState<AspectRatio>(aspectRatio);

  const handleChangeAspect =
    (aspectType: 'orientation' | 'aspectRatio') =>
    (value: Orientation | AspectRatio) => {
      console.log('aspect', aspect);
      console.log('value', value);
      if (aspectType === 'orientation') {
        const newOrientation = value as Orientation;
        setOrientation(newOrientation);
        let newRatio = 1;
        if (
          (newOrientation === 'landscape' && orientation === 'portrait') ||
          (newOrientation === 'portrait' && orientation === 'landscape')
        ) {
          newRatio = 1 / aspect.value;
        }

        if (newOrientation === 'square') newRatio = 1;
        if (newOrientation === 'landscape' && orientation !== 'portrait')
          newRatio = 4 / 3; // 4:3 pour rester cohérent avec l'initialisation de aspectRatio dans le store
        if (newOrientation === 'portrait' && orientation !== 'landscape')
          newRatio = 3 / 4;
        if (newOrientation === 'panoramic') newRatio = 65 / 24;
        console.log('ratio', aspect.value);
        console.log('newRatio', newRatio);
        // setRatio(newRatio);
        const newAspectRatio = avaibleAspectRatio[newOrientation].find(
          (ar: AspectRatio) => newRatio === ar.value
        ) as AspectRatio;
        setAspect(newAspectRatio);
        setAspectRatio(newAspectRatio);
      }
      if (aspectType === 'aspectRatio') {
        const newAspectRatio = value as AspectRatio;
        console.log('ratio', aspect.value);
        console.log('newAspectRatio.value', newAspectRatio.value);
        // setRatio(newAspectRatio.value);
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
          {Object.keys(avaibleAspectRatio).map((avaibleOrientation) => (
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
              avaibleAspectRatio[orientation].find(
                (a: AspectRatio) => a.display === e.target.value
              ) as AspectRatio
            )
          }
        >
          {avaibleAspectRatio[orientation].map((a: AspectRatio) => (
            <option key={a.display} value={a.display}>
              {a.display}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default ImageFormatSetting;
