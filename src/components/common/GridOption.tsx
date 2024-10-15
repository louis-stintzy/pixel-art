import useSavePublishPreview from '../../hooks/useSavePublishPreview';
import { useGridOptionSelected } from '../../store/selector';
import useStore from '../../store/store';

interface GridOptionProps {
  display: 'radio' | 'button';
}

function GridOption({ display }: GridOptionProps) {
  const gridOption = {
    none: 'No grid',
    pixel: 'Border per Pixel',
    full: 'Full grid',
  };

  const gridOptionSelected = useGridOptionSelected();
  const { setGridOptionSelected } = useStore((state) => state);
  const { revokePreviewUrl, handleSaveOrPublishOrPreview } =
    useSavePublishPreview();

  const handleGridOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGridOptionSelected(e.target.value as 'none' | 'pixel' | 'full');
    revokePreviewUrl();
  };

  const handleClick = (key: string) => {
    setGridOptionSelected(key as 'none' | 'pixel' | 'full');
    handleSaveOrPublishOrPreview('preview');
  };

  if (display === 'radio') {
    return (
      <div
        className="description-fields__grid-option"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
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

  if (display === 'button') {
    return (
      <div
        id="grid-option"
        style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}
      >
        {Object.entries(gridOption).map(([key, value]) => (
          <button
            key={key}
            id={`grid-option__btn-${key}`}
            type="button"
            onClick={() => {
              handleClick(key);
            }}
          >
            {value}
          </button>
        ))}
      </div>
    );
  }
}

export default GridOption;
