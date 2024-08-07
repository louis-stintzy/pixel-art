import { useState } from 'react';
import useStore from '../../../store/store';

function ColoringModeOption() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const isColoring = useStore((state) => state.isColoring);
  const setIsColoring = useStore((state) => state.setIsColoring);

  const handleBrushButtonClick = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsColoring(!isColoring);
      setIsFadingOut(false);
    }, 100);
  };

  const iconSrc = isColoring
    ? 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBhaW50YnJ1c2giPjxwYXRoIGQ9Im0xNC42MjIgMTcuODk3LTEwLjY4LTIuOTEzIi8+PHBhdGggZD0iTTE4LjM3NiAyLjYyMmExIDEgMCAxIDEgMy4wMDIgMy4wMDJMMTcuMzYgOS42NDNhLjUuNSAwIDAgMCAwIC43MDdsLjk0NC45NDRhMi40MSAyLjQxIDAgMCAxIDAgMy40MDhsLS45NDQuOTQ0YS41LjUgMCAwIDEtLjcwNyAwTDguMzU0IDcuMzQ4YS41LjUgMCAwIDEgMC0uNzA3bC45NDQtLjk0NGEyLjQxIDIuNDEgMCAwIDEgMy40MDggMGwuOTQ0Ljk0NGEuNS41IDAgMCAwIC43MDcgMHoiLz48cGF0aCBkPSJNOSA4Yy0xLjgwNCAyLjcxLTMuOTcgMy40Ni02LjU4MyAzLjk0OGEuNTA3LjUwNyAwIDAgMC0uMzAyLjgxOWw3LjMyIDguODgzYTEgMSAwIDAgMCAxLjE4NS4yMDRDMTIuNzM1IDIwLjQwNSAxNiAxNi43OTIgMTYgMTUiLz48L3N2Zz4='
    : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBlbmNpbCI+PHBhdGggZD0iTTIxLjE3NCA2LjgxMmExIDEgMCAwIDAtMy45ODYtMy45ODdMMy44NDIgMTYuMTc0YTIgMiAwIDAgMC0uNS44M2wtMS4zMjEgNC4zNTJhLjUuNSAwIDAgMCAuNjIzLjYyMmw0LjM1My0xLjMyYTIgMiAwIDAgMCAuODMtLjQ5N3oiLz48cGF0aCBkPSJtMTUgNSA0IDQiLz48L3N2Zz4=';
  const brushButtonStyle = {};

  const IconStyle = {
    opacity: isFadingOut ? 0 : 1,
    transition: 'opacity 0.1s ease-out',
  };

  return (
    <button
      id="brush-button"
      type="button"
      style={brushButtonStyle}
      onClick={handleBrushButtonClick}
    >
      <img src={iconSrc} alt="Icon" style={IconStyle} />
    </button>
  );
}

export default ColoringModeOption;
