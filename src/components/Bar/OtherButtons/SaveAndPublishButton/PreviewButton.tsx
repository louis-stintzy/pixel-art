import useSavePublishPreview from '../../../../hooks/useSavePublishPreview';
import {
  useIsLogged,
  usePixelArtName,
  useUser,
} from '../../../../store/selectors/selector';

function PreviewButton() {
  const user = useUser();
  const isLogged = useIsLogged();
  const pixelArtName = usePixelArtName();
  const { handleSaveOrPublishOrPreview } = useSavePublishPreview();

  const previewLinkStyle: React.CSSProperties =
    !isLogged || !user || pixelArtName.length < 3
      ? {
          color: 'gray',
          cursor: 'not-allowed',
          border: ' none',
          backgroundColor: 'transparent',
        }
      : {
          color: 'blue',
          cursor: 'pointer',
          border: ' none',
          backgroundColor: 'transparent',
        };

  return (
    <button
      type="button"
      className="description-fields__preview-link"
      style={previewLinkStyle}
      onClick={() => handleSaveOrPublishOrPreview('preview')}
      disabled={!isLogged || !user || pixelArtName.length < 3}
    >
      {pixelArtName.length < 3
        ? 'Please enter the name of your pixel art'
        : 'Click to see a preview'}
    </button>
  );
}

export default PreviewButton;
