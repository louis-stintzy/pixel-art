import { useRef, useState } from 'react';
import Grid from '../Grid/Grid';
import useStore from '../../store/store';

function GridContainer() {
  const gridRef = useRef(null);
  const isDragging = useRef(false);
  const setUserDragsGrid = useStore((state) => state.setUserDragsGrid);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const mouseDownRef = useRef(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseDownRef.current = true;
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
    setTimeout(() => {
      if (mouseDownRef.current) {
        isDragging.current = true;
        setUserDragsGrid(true);
      }
    }, 100); // délai avant de commencer à drag
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) {
      return;
    }
    const deltaX = e.clientX - lastMousePosition.current.x;
    const deltaY = e.clientY - lastMousePosition.current.y;
    setPosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    // if (gridRef.current) {
    //   const deltaX = e.clientX - lastMousePosition.current.x;
    //   const deltaY = e.clientY - lastMousePosition.current.y;
    //   (gridRef.current as HTMLDivElement).scrollLeft -= deltaX; // Add type assertion to fix the issue
    //   (gridRef.current as HTMLDivElement).scrollTop -= deltaY; // Add type assertion to fix the issue
    // }

    lastMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging.current) {
      setTimeout(() => {
        isDragging.current = false;
        setUserDragsGrid(false);
      }, 50);
    }
    mouseDownRef.current = false;
  };

  const gridContainerStyle = {
    padding: '1rem',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    // cursor: isDragging.current ? 'grabbing' : 'grab',
  };

  const gridWrapperStyle = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: isDragging.current ? 'none' : 'transform 0.1s ease-out',
  };

  return (
    <div
      id="grid-container"
      role="grid"
      style={gridContainerStyle}
      tabIndex={0} // Add tabIndex attribute to make the grid container focusable
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      ref={gridRef}
    >
      <div id="grid-wrapper" style={gridWrapperStyle}>
        <Grid />
      </div>
    </div>
  );
}

export default GridContainer;
