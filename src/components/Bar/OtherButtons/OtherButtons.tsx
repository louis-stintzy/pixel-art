import Button from '../../common/Button';
import otherButtons from '../../../constants/otherButtons';

function OtherButtons() {
  const otherButtonsStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '3px',
  };
  return (
    <div id="other-buttons" style={otherButtonsStyle}>
      {otherButtons.map((button) => (
        <Button
          key={button.id}
          id={button.id}
          buttonStyle={button.buttonStyle}
          tooltip={button.tooltip}
          icon={button.icon}
          disabled={button.disabled}
          onClickButton={button.onClickButton}
        />
      ))}
    </div>
  );
}

export default OtherButtons;
