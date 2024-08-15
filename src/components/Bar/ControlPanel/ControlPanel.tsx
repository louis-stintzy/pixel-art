import ActionButton from './ActionButton';
import actionButtons from '../../../constants/actionButtons';

function ControlPanel() {
  return (
    <div className="control-panel">
      {actionButtons.map((actionButton) => (
        <ActionButton
          key={actionButton.id}
          id={actionButton.id}
          buttonStyle={actionButton.buttonStyle}
          isDisabled={actionButton.isDisabled}
          iconSrcAction1={actionButton.iconSrcAction1}
          iconSrcAction2={actionButton.iconSrcAction2}
          tooltipAction1={actionButton.tooltipAction1}
          tooltipAction2={actionButton.tooltipAction2}
          labelAction1={actionButton.labelAction1}
          labelAction2={actionButton.labelAction2}
          conditionForAction2={actionButton.conditionForAction2}
          onAction1={actionButton.onAction1}
          onAction2={actionButton.onAction2}
        />
      ))}
    </div>
  );
}

export default ControlPanel;
