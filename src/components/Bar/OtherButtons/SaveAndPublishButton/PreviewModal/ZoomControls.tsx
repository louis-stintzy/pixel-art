import { useCallback } from 'react';

interface ZoomControlsProps {
  setZoom: (zoom: number) => void;
  resetPosition: () => void;
  initialZoom: number;
  zoom: number;
}

function ZoomControls({
  initialZoom,
  zoom,
  setZoom,
  resetPosition,
}: ZoomControlsProps) {
  const handleZoomChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setZoom(parseFloat(e.target.value));
    },
    [setZoom]
  );

  const handleResetZoom = () => {
    resetPosition();
    setZoom(initialZoom);
  };
  return (
    <div
      id="zoom-controller"
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '10px 0 3px 0',
      }}
    >
      <input
        id="zoom-controller__input-range"
        type="range"
        value={zoom}
        min={0.2}
        max={5}
        step={0.2}
        onChange={handleZoomChange}
      />
      <button
        id="zoom-controller__btn-reset"
        type="button"
        onClick={handleResetZoom}
        style={{ margin: '0 5px' }}
      >
        Reset
      </button>
    </div>
  );
}

export default ZoomControls;
