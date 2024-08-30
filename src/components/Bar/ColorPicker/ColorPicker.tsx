import { Color } from '../../../@types/colorPalette';
import useStore from '../../../store/store';

function ColorPicker() {
  const selectedPalette = useStore((state) => state.selectedPalette);

  let touchStart: number;

  const handleTouchStart = () => {
    touchStart = Date.now();
  };

  const handleTouchEnd = (color: Color) => {
    if (Date.now() - touchStart > 3000) {
      console.log('ouvrir menu contextuel');
    }
  };

  const handleContextMenu = (e: React.MouseEvent, color: Color) => {
    e.preventDefault();
    console.log('ouvrir menu contextuel');
    // const { addFavoriteColor } = useStore.getState();
    // addFavoriteColor(color);
  };

  const handleClick = (color: Color) => {
    const { setSelectedColor, addRecentColor } = useStore.getState();
    setSelectedColor(color);
    addRecentColor(color);
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
          onTouchStart={() => handleTouchStart()}
          onTouchEnd={() => handleTouchEnd(color)}
          onContextMenu={(e) => handleContextMenu(e, color)}
          aria-label={`Select ${color} color`}
        />
      ))}
    </div>
  );
}

export default ColorPicker;
