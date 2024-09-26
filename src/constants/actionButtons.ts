import useStore from '../store/store';

import {
  getImageUrl,
  getIsReadyToDraw,
  getIsEraser,
  getIsBigTool,
  getIsSelectingColorToChange,
  getIsImageHidden,
} from '../store/selector';
import {
  dragIcon,
  drawIcon,
  colorIcon,
  eraseIcon,
  smallToolIcon,
  bigToolIcon,
  paperIcon,
  bucketIcon,
  showIcon,
  hideIcon,
} from './icons';

const buttonStyle = {};

const alwaysActive = () => false;

// ----- Getters -----
const isReadyToDraw = () => getIsReadyToDraw();
const isNotReadyToDraw = () => !getIsReadyToDraw();
const isEraser = () => getIsEraser();
const isBigTool = () => getIsBigTool();
const isSelectingColorToChange = () => getIsSelectingColorToChange();
const isImageHidden = () => getIsImageHidden();
const noImage = () => !getImageUrl();

// ----- Setters -----
const switchToColorMode = () => useStore.getState().setIsReadyToDraw(true);
const switchToDragMode = () => useStore.getState().setIsReadyToDraw(false);
const switchToEraseMode = () => useStore.getState().setIsEraser(true);
const switchToColorMode2 = () => useStore.getState().setIsEraser(false);
const switchToBigTool = () => useStore.getState().setIsBigTool(true);
const switchToSmallTool = () => useStore.getState().setIsBigTool(false);
const activateColorReplacement = () =>
  useStore.getState().setColorReplacement({
    isSelectingColor: true,
  });
const deactivateColorReplacement = () =>
  useStore.getState().setColorReplacement({
    isSelectingColor: false,
  });
const hideImage = () => useStore.getState().setIsImageHidden(true);
const showImage = () => useStore.getState().setIsImageHidden(false);

const actionButtons = [
  // ----- toggle-drag-draw-mode -----
  {
    id: 'toggle-drag-draw-mode',
    buttonStyle,
    deactivate: {
      shouldDeactivate: alwaysActive,
    },
    iconSrcMode1: dragIcon,
    iconSrcMode2: drawIcon,
    tooltipMode1: 'Switch to draw mode',
    tooltipMode2: 'Switch to drag mode',
    labelMode1: 'Switch to draw mode',
    labelMode2: 'Switch to drag mode',
    isInMode2: isReadyToDraw,
    switchToMode1: switchToDragMode,
    switchToMode2: switchToColorMode,
  },
  // ----- toggle-color-erase-mode -----
  {
    id: 'toggle-color-erase-mode',
    buttonStyle,
    deactivate: {
      subscribeToState: 'isReadyToDraw',
      shouldDeactivate: isNotReadyToDraw,
    },
    iconSrcMode1: colorIcon,
    iconSrcMode2: eraseIcon,
    tooltipMode1: 'Switch to erasing mode',
    tooltipMode2: 'Switch to coloring mode',
    labelMode1: 'Switch to erasing mode',
    labelMode2: 'Switch to coloring mode',
    isInMode2: isEraser,
    switchToMode1: switchToColorMode2,
    switchToMode2: switchToEraseMode,
  },
  // ----- toggle-tool-size -----
  {
    id: 'toggle-tool-size',
    buttonStyle,
    deactivate: {
      subscribeToState: 'isReadyToDraw',
      shouldDeactivate: isNotReadyToDraw,
    },
    iconSrcMode1: smallToolIcon,
    iconSrcMode2: bigToolIcon,
    labelMode1: 'Big tool',
    labelMode2: 'Small tool',
    tooltipMode1: 'Switch to big tool',
    tooltipMode2: 'Switch to small tool',
    isInMode2: isBigTool,
    switchToMode1: switchToSmallTool,
    switchToMode2: switchToBigTool,
  },
  // ----- replace-a-color -----
  {
    id: 'replace-a-color',
    buttonStyle,
    deactivate: {
      shouldDeactivate: alwaysActive,
    },
    iconSrcMode1: paperIcon,
    iconSrcMode2: bucketIcon,
    tooltipMode1: 'Replace a color',
    tooltipMode2: 'Return to normal mode',
    labelMode1: 'Replace a color',
    labelMode2: 'Return to normal mode',
    isInMode2: isSelectingColorToChange,
    switchToMode1: deactivateColorReplacement,
    switchToMode2: activateColorReplacement,
  },
  // ----- toggle-show-hide-image -----
  {
    id: 'toggle-show-hide-image',
    buttonStyle,
    deactivate: {
      subscribeToState: 'imageUrl',
      shouldDeactivate: noImage,
    },
    iconSrcMode1: showIcon,
    iconSrcMode2: hideIcon,
    tooltipMode1: 'Hide image',
    tooltipMode2: 'Show image',
    labelMode1: 'Hide image',
    labelMode2: 'Show image',
    isInMode2: isImageHidden,
    switchToMode1: showImage,
    switchToMode2: hideImage,
  },
];

export default actionButtons;
