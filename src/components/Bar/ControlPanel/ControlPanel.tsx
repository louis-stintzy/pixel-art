import ActionButton from '../../common/ActionButton';
import actionButtons from '../../../constants/actionButtons';

function ControlPanel() {
  return (
    <div className="control-panel">
      {actionButtons.map((actionButton) => (
        <ActionButton
          key={actionButton.id}
          id={actionButton.id}
          buttonStyle={actionButton.buttonStyle}
          deactivate={{
            subscribeToState: actionButton.deactivate.subscribeToState,
            shouldDeactivate: actionButton.deactivate.shouldDeactivate,
          }}
          iconSrcMode1={actionButton.iconSrcMode1}
          iconSrcMode2={actionButton.iconSrcMode2}
          tooltipMode1={actionButton.tooltipMode1}
          tooltipMode2={actionButton.tooltipMode2}
          labelMode1={actionButton.labelMode1}
          labelMode2={actionButton.labelMode2}
          isInMode2={actionButton.isInMode2}
          switchToMode1={actionButton.switchToMode1}
          switchToMode2={actionButton.switchToMode2}
        />
      ))}
    </div>
  );
}

export default ControlPanel;
