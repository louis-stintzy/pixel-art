import CreatorField from './CreatorField';
import NameAndDescriptionField from './NameAndDescriptionFields';
import GridOption from '../../../common/GridOption';
import PreviewButton from './PreviewButton';

import './DescriptionModalContent.scss';
import CancelAndConfirmationButtons from './CancelAndConfirmationButtons';

function DescriptionModalContent() {
  return (
    <div className="description-modal-content flexAndColumnDirectionStyle">
      <div className="description-fields flexAndColumnDirectionStyle">
        <CreatorField />
        <NameAndDescriptionField />
        <GridOption display="radio" />
        <PreviewButton />
      </div>
      <div className="cancel-and-confirmation-buttons">
        <CancelAndConfirmationButtons />
      </div>
    </div>
  );
}

export default DescriptionModalContent;
