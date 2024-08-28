import useStore from '../../../store/store';

function ColorPicker() {
  const selectedPalette = useStore((state) => state.selectedPalette);
  const setSelectedColor = useStore((state) => state.setSelectedColor);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {selectedPalette.colors.map((color) => (
        <button
          key={color.code}
          type="button"
          style={{
            backgroundColor: color.code,
            width: '2rem',
            height: '2rem',
            borderRadius: '40%',
            cursor: 'pointer',
          }}
          title={color.name}
          onClick={() => setSelectedColor(color)}
          aria-label={`Select ${color} color`}
        />
      ))}
    </div>
  );
}

export default ColorPicker;
