import { useState } from 'react';
import avaibleAspectRatio, {
  Orientation,
  AspectRatio,
} from '../../constants/aspectRatio';
import useStore from '../../store/store';

function ImageFormatSetting() {
  const [orientation, setOrientation] = useState<Orientation>('landscape');
  const [ratio, setRatio] = useState<number>(4 / 3);
  const setAspectRatio = useStore((state) => state.setAspectRation);

  const handleChangeAspect =
    (aspect: 'orientation' | 'aspectRatio') =>
    (value: Orientation | AspectRatio) => {
      if (aspect === 'orientation') {
        const newOrientation = value as Orientation;
        setOrientation(newOrientation);
        let newRatio = 1;
        if (
          (newOrientation === 'landscape' && orientation === 'portrait') ||
          (newOrientation === 'portrait' && orientation === 'landscape')
        ) {
          newRatio = 1 / ratio;
        }

        if (newOrientation === 'square') newRatio = 1;
        if (newOrientation === 'landscape' && orientation !== 'portrait')
          newRatio = 3 / 2;
        if (newOrientation === 'portrait' && orientation !== 'landscape')
          newRatio = 2 / 3;
        if (newOrientation === 'panoramic') newRatio = 65 / 24;
        setRatio(newRatio);
        const newAspectRatio = avaibleAspectRatio[newOrientation].find(
          (ar: AspectRatio) => newRatio === ar.value
        ) as AspectRatio;
        setAspectRatio(newAspectRatio);
      }
      if (aspect === 'aspectRatio') {
        const newAspectRatio = value as AspectRatio;
        setRatio(newAspectRatio.value);
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
          value={ratio}
          onChange={(e) =>
            handleChangeAspect('aspectRatio')(
              avaibleAspectRatio[orientation].find(
                (aspect: AspectRatio) => aspect.display === e.target.value
              ) as AspectRatio
            )
          }
        >
          {avaibleAspectRatio[orientation].map((aspect: AspectRatio) => (
            <option key={aspect.display} value={aspect.display}>
              {aspect.display}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default ImageFormatSetting;
