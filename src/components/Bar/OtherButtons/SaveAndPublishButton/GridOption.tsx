import usePreviewUrlManagement from '../../../../hooks/usePreviewUrlManagement';
import { useGridOptionSelected } from '../../../../store/selector';
import useStore from '../../../../store/store';
import './DescriptionModalContent.scss';

function GridOption() {
  const gridOption = {
    none: 'No grid',
    pixel: 'Border per Pixel',
    full: 'Full grid',
  };

  const gridOptionSelected = useGridOptionSelected();
  const { setGridOptionSelected } = useStore((state) => state);
  const { revokePreviewUrl } = usePreviewUrlManagement();

  const handleGridOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGridOptionSelected(e.target.value as 'none' | 'pixel' | 'full');
    revokePreviewUrl();
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
