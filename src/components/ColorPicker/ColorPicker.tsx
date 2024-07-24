import colors from '../../constants/colors';

function ColorPicker() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {colors.map((color) => (
        <div
          key={color}
          style={{
            backgroundColor: color,
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
        />
      ))}
    </div>
  );
}

export default ColorPicker;
