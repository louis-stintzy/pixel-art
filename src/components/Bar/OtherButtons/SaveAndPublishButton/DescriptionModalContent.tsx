import { useState } from 'react';
import CreatorField from './CreatorField';
import NameAndDescriptionField from './NameAndDescriptionFields';
import GridOption from './GridOption';
import PreviewButton from './PreviewButton';

import './DescriptionModalContent.scss';
import CancelAndConfirmationButtons from './CancelAndConfirmationButtons';

function DescriptionModalContent() {
  const [gridOptionSelected, setGridOptionSelected] = useState<
    'none' | 'pixel' | 'full'
  >('full');

  return (
    <div className="description-modal-content flexAndColumnDirectionStyle">
      <div className="description-fields flexAndColumnDirectionStyle">
        <CreatorField />
        <NameAndDescriptionField />
        <GridOption
          gridOptionSelected={gridOptionSelected}
          setGridOptionSelected={setGridOptionSelected}
        />
        <PreviewButton gridOptionSelected={gridOptionSelected} />
      </div>
      <div className="cancel-and-confirmation-buttons">
        <CancelAndConfirmationButtons gridOptionSelected={gridOptionSelected} />
      </div>
    </div>
  );
}

export default DescriptionModalContent;
