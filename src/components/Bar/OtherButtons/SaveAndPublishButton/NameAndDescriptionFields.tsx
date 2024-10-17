import {
  usePixelArtDescription,
  usePixelArtName,
} from '../../../../store/selectors/selector';
import { setDescriptionFields } from '../../../../store/actions/storeActions';
import './DescriptionModalContent.scss';

function NameAndDescriptionFields() {
  const pixelArtName = usePixelArtName();
  const pixelArtDescription = usePixelArtDescription();

  const handleDescriptionFieldsChange = (
    field: 'name' | 'description',
    value: string
  ) => {
    setDescriptionFields(field, value);
  };

  return (
    <>
      <div className="description-fields__name-field flexAndColumnDirectionStyle">
        <label htmlFor="name">Name </label>
        <input
          type="text"
          id="name"
          value={pixelArtName}
          onChange={(e) =>
            handleDescriptionFieldsChange('name', e.target.value)
          }
          placeholder="Pixel Art name (Min 3 characters)"
        />
      </div>
      <div className="description-fields__description-field flexAndColumnDirectionStyle">
        <label htmlFor="description">Description </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="Description"
          onChange={(e) =>
            handleDescriptionFieldsChange('description', e.target.value)
          }
          value={pixelArtDescription}
        />
      </div>
    </>
  );
}

export default NameAndDescriptionFields;
