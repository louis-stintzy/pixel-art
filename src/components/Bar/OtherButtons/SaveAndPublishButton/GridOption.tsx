import { usePreviewUrl } from '../../../../store/selector';
import useStore from '../../../../store/store';
import './DescriptionModalContent.scss';

interface GridOptionProps {
  gridOptionSelected: 'none' | 'pixel' | 'full';
  setGridOptionSelected: (gridOption: 'none' | 'pixel' | 'full') => void;
}

function GridOption({
  gridOptionSelected,
  setGridOptionSelected,
}: GridOptionProps) {
  const previewUrl = usePreviewUrl();
  const { setPreviewUrl } = useStore((state) => state);
  const gridOption = {
    none: 'No grid',
    pixel: 'Border per Pixel',
    full: 'Full grid',
  };

  const handleGridOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGridOptionSelected(e.target.value as 'none' | 'pixel' | 'full');
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl('');
  };

  return (
    <div className="description-fields__grid-option flexAndColumnDirectionStyle">
      {Object.entries(gridOption).map(([key, value]) => (
        <label key={key}>
          <input
            type="radio"
            name="gridOption"
            value={key}
            onChange={handleGridOptionChange}
            checked={gridOptionSelected === key}
            // disabled={!isLogged || !user || pixelArtName.length < 3}
          />
          {value}
        </label>
      ))}
    </div>
  );
}

export default GridOption;
