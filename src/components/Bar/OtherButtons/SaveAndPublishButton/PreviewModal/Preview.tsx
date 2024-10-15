import { useGridSize, usePreviewUrl } from '../../../../../store/selector';

interface PreviewProps {
  childOfModalRef: React.RefObject<HTMLDivElement>;
  previewContainerRef: React.RefObject<HTMLDivElement>;
  position: { x: number; y: number };
  zoom: number;
}

function Preview({
  childOfModalRef,
  previewContainerRef,
  position,
  zoom,
}: PreviewProps) {
  const previewUrl = usePreviewUrl();
  const gridSize = useGridSize();

  // si il y a bien un childOfModalRef et que la largeur de l'image (redimensionnée) est plus grande que la largeur du childOfModalRef :
  // on retourne la largeur de l'image en zoom, sinon on retourne 100% pour que l'image soit centrée et qu'il n'y ait pas de pb de container trop petit
  // (l'image sortirait du container  tout en étant plus petit que la modal)
  const calculatePreviewContainerWidth = () => {
    if (childOfModalRef.current) {
      return gridSize.width * gridSize.pixelSize * zoom >
        childOfModalRef.current.clientWidth
        ? gridSize.width * gridSize.pixelSize * zoom
        : '100%';
    }
    return gridSize.width * gridSize.pixelSize * zoom;
  };

  const previewContainerStyle: React.CSSProperties = {
    width: calculatePreviewContainerWidth(),
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  const previewWrapperStyle: React.CSSProperties = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: 'transform 0.1s ease-out',
  };

  const previewStyle: React.CSSProperties = {
    width: `${gridSize.width * gridSize.pixelSize * zoom}px`,
    height: `auto`,
    pointerEvents: 'none', // pour que le drag and drop fonctionne sur la div parent et non sur l'image
  };
  return (
    <div
      id="previewContainer"
      ref={previewContainerRef}
      style={previewContainerStyle}
    >
      <div id="previewWrapper" style={previewWrapperStyle}>
        <img src={previewUrl} alt="preview" style={previewStyle} />
      </div>
    </div>
  );
}

export default Preview;
