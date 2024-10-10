import {
  useGridOptionSelected,
  usePreviewUrl,
} from '../../../../store/selector';
import useStore from '../../../../store/store';
import './DescriptionModalContent.scss';

function GridOption() {
  const gridOptionSelected = useGridOptionSelected();
  const previewUrl = usePreviewUrl();
  const { setPreviewUrl, setGridOptionSelected } = useStore((state) => state);
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
          />
          {value}
        </label>
      ))}
    </div>
  );
}

export default GridOption;
