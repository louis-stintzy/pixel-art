import { useEffect, useRef } from 'react';
import useStore from '../../store/store';
import useDragAndDrop from '../../hooks/useDragAndDrop';
import Grid from './Grid/Grid';
import ImageUnderTheGrid from './ImageUnderTheGrid/ImageUnderTheGrid';
import './GridContainer.scss';

function GridContainer() {
  // useRef permet de stocker une valeur mutable qui ne déclenchera pas de nouveau rendu lorsqu'elle est modifiée.
  // useRef renvoie un objet avec une propriété current qui est mutable.
  // useRef est idéal pour conserver des références à des éléments DOM ou des valeurs qui ne nécessitent pas de re-render de composant lorsqu'elles sont modifiées.
  // C'est particulièrement utile pour suivre l'état d'interactions utilisateur comme le drag-and-drop.
  const gridRef = useRef<HTMLDivElement | null>(null); // Référence pour le conteneur de la grille
  const { position, isDragging } = useDragAndDrop(gridRef); // Position de la grille et état de glissement (custom hook)
  const setUserDragsGrid = useStore((state) => state.setUserDragsGrid); // Fonction pour définir si l'utilisateur fait glisser la grille (etat global)

  useEffect(() => {
    setUserDragsGrid(isDragging);
  }, [isDragging, setUserDragsGrid]);

  const gridWrapperStyle: React.CSSProperties = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: 'transform 0.1s ease-out',
  };

  return (
    <div
      id="grid-container"
      role="grid"
      tabIndex={0} // Add tabIndex attribute to make the grid container focusable
      ref={gridRef}
    >
      <div id="grid-wrapper" style={gridWrapperStyle}>
        <Grid />
        <ImageUnderTheGrid />
      </div>
    </div>
  );
}

export default GridContainer;
