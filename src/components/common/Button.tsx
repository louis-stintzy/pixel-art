interface ButtonProps {
  id: string;
  buttonStyle?: React.CSSProperties;
  tooltip: string;
  icon: {
    src: string;
    alt: string;
  };
  disabled?: boolean;
  onClickButton: () => void;
}

function Button({
  id,
  buttonStyle,
  tooltip,
  icon,
  disabled,
  onClickButton,
}: ButtonProps) {
  return (
    <button
      type="button"
      id={id}
      style={buttonStyle}
      aria-label={tooltip}
      title={tooltip}
      disabled={disabled}
      onClick={onClickButton}
    >
      <img src={icon.src} alt={icon.alt} />
    </button>
  );
}

Button.defaultProps = {
  buttonStyle: {},
  disabled: false,
};

export default Button;
