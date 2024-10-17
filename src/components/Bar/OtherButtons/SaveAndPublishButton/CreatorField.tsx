import { useUser } from '../../../../store/selectors/selector';

import './DescriptionModalContent.scss';

function CreatorField() {
  const user = useUser();
  return (
    <div className="description-fields__creator-field flexAndColumnDirectionStyle">
      <label htmlFor="creator">Creator </label>
      <input type="text" id="creator" value={user?.username} disabled />
    </div>
  );
}

export default CreatorField;
