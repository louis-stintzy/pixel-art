import { Color } from '../../../@types/colorPalette';
import useStore from '../../../store/store';

function ColorPicker() {
  const selectedPalette = useStore((state) => state.selectedPalette);

  const handleClick = (color: Color) => {
    const { setSelectedColor, addRecentColor } = useStore.getState();
    setSelectedColor(color);
    addRecentColor(color);
  };

  const handleContextMenu = (e: React.MouseEvent, color: Color) => {
    e.preventDefault();
    const { addFavoriteColor } = useStore.getState();
    addFavoriteColor(color);
  };

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
          onClick={() => handleClick(color)}
          onContextMenu={(e) => handleContextMenu(e, color)}
          aria-label={`Select ${color} color`}
        />
      ))}
    </div>
  );
}

export default ColorPicker;
