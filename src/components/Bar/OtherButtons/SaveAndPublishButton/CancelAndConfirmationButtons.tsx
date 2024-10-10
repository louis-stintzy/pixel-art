import {
  useClickedButton,
  useIsLogged,
  usePixelArtName,
  useUser,
} from '../../../../store/selector';
import useStore from '../../../../store/store';
import useSavePublishPreview from '../../../../hooks/useSavePublishPreview';

function CancelAndConfirmationButtons() {
  const user = useUser();
  const isLogged = useIsLogged();
  const pixelArtName = usePixelArtName();
  const buttonClickedInOtherButtons = useClickedButton();
  const { handleSaveOrPublishOrPreview } = useSavePublishPreview();

  let confirmationButton = null;
  if (isLogged && user) {
    confirmationButton =
      buttonClickedInOtherButtons === 'save' ? 'Save' : 'Publish';
  }

  const handleCancel = () => {
    useStore.getState().resetDescriptionFields();
    useStore.getState().setIsDescriptionModalOpen(false);
  };

  const handleSavePublish = (action: 'save' | 'publish') => () => {
    handleSaveOrPublishOrPreview(action);
  };

  return (
    <>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
      {confirmationButton && (
        <button
          type="button"
          onClick={
            confirmationButton === 'Save'
              ? handleSavePublish('save')
              : handleSavePublish('publish')
          }
          disabled={pixelArtName.length < 3}
        >
          {confirmationButton}
        </button>
      )}
    </>
  );
}

export default CancelAndConfirmationButtons;
