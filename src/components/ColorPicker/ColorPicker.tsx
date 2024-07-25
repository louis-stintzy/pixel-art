import colors from '../../constants/colors';
import useStore from '../../store/store';

function ColorPicker() {
  const setSelectedColor = useStore((state) => state.setSelectedColor);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          style={{
            backgroundColor: color,
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
          onClick={() => setSelectedColor(color)}
          aria-label={`Select ${color} color`}
        />
      ))}
    </div>
  );
}

export default ColorPicker;
