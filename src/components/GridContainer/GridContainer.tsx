import { useEffect, useRef } from 'react';
import useDragAndDrop from '../../hooks/useDragAndDrop';
import Grid from './Grid/Grid';
import ImageUnderTheGrid from './ImageUnderTheGrid/ImageUnderTheGrid';
import './GridContainer.scss';
import Loader from './Loader/Loader';
import ToastsContainer from './ToastsContainer/ToastsContainer';
import {
  useIsReadyToDraw,
  useIsImageHidden,
  useIsColorReplacementLoading,
} from '../../store/selectors/selector';
import { setUserDragsGrid } from '../../store/actions/storeActions';

function GridContainer() {
  const isReadyToDraw = useIsReadyToDraw(); // État pour savoir si l'utilisateur est en train de colorier (etat global)
  const isImageHidden = useIsImageHidden(); // État pour savoir si l'image est visible (etat global)
  const isColorReplacementLoading = useIsColorReplacementLoading(); // État pour savoir si le remplacement de couleur est en cours (etat global)

  // useRef permet de stocker une valeur mutable qui ne déclenchera pas de nouveau rendu lorsqu'elle est modifiée.
  // useRef renvoie un objet avec une propriété current qui est mutable.
  // useRef est idéal pour conserver des références à des éléments DOM ou des valeurs qui ne nécessitent pas de re-render de composant lorsqu'elles sont modifiées.
  // C'est particulièrement utile pour suivre l'état d'interactions utilisateur comme le drag-and-drop.
  const gridRef = useRef<HTMLDivElement | null>(null); // Référence pour le conteneur de la grille
  const { position, isDragging } = useDragAndDrop(gridRef, !isReadyToDraw); // Position de la grille et état de glissement (custom hook)

  useEffect(() => {
    setUserDragsGrid(isDragging);
  }, [isDragging]);

  // Observe un décalage entre les premiers executeMouseLogic dans useDAD et le premier déplacement de la grille (voir MIN_DRAG_DISTANCE ?)
  // useEffect(() => {
  //   console.log(Date.now(), ' - position : ', position);
  // }, [position]);

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
      {isColorReplacementLoading && <Loader />}
      <div id="grid-wrapper" style={gridWrapperStyle}>
        <Grid />
        {!isImageHidden && <ImageUnderTheGrid />}
      </div>
      <ToastsContainer />
    </div>
  );
}

export default GridContainer;
