import useStore from '../store/store';

const buttonStyle = {};

// ----- Icon -----
const dragIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1vdmUiPjxwb2x5bGluZSBwb2ludHM9IjUgOSAyIDEyIDUgMTUiLz48cG9seWxpbmUgcG9pbnRzPSI5IDUgMTIgMiAxNSA1Ii8+PHBvbHlsaW5lIHBvaW50cz0iMTUgMTkgMTIgMjIgOSAxOSIvPjxwb2x5bGluZSBwb2ludHM9IjE5IDkgMjIgMTIgMTkgMTUiLz48bGluZSB4MT0iMiIgeDI9IjIyIiB5MT0iMTIiIHkyPSIxMiIvPjxsaW5lIHgxPSIxMiIgeDI9IjEyIiB5MT0iMiIgeTI9IjIyIi8+PC9zdmc+';
const drawIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNxdWFyZS1wZW4iPjxwYXRoIGQ9Ik0xMiAzSDVhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJ2LTciLz48cGF0aCBkPSJNMTguMzc1IDIuNjI1YTEgMSAwIDAgMSAzIDNsLTkuMDEzIDkuMDE0YTIgMiAwIDAgMS0uODUzLjUwNWwtMi44NzMuODRhLjUuNSAwIDAgMS0uNjItLjYybC44NC0yLjg3M2EyIDIgMCAwIDEgLjUwNi0uODUyeiIvPjwvc3ZnPg==';
const colorIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBhaW50YnJ1c2giPjxwYXRoIGQ9Im0xNC42MjIgMTcuODk3LTEwLjY4LTIuOTEzIi8+PHBhdGggZD0iTTE4LjM3NiAyLjYyMmExIDEgMCAxIDEgMy4wMDIgMy4wMDJMMTcuMzYgOS42NDNhLjUuNSAwIDAgMCAwIC43MDdsLjk0NC45NDRhMi40MSAyLjQxIDAgMCAxIDAgMy40MDhsLS45NDQuOTQ0YS41LjUgMCAwIDEtLjcwNyAwTDguMzU0IDcuMzQ4YS41LjUgMCAwIDEgMC0uNzA3bC45NDQtLjk0NGEyLjQxIDIuNDEgMCAwIDEgMy40MDggMGwuOTQ0Ljk0NGEuNS41IDAgMCAwIC43MDcgMHoiLz48cGF0aCBkPSJNOSA4Yy0xLjgwNCAyLjcxLTMuOTcgMy40Ni02LjU4MyAzLjk0OGEuNTA3LjUwNyAwIDAgMC0uMzAyLjgxOWw3LjMyIDguODgzYTEgMSAwIDAgMCAxLjE4NS4yMDRDMTIuNzM1IDIwLjQwNSAxNiAxNi43OTIgMTYgMTUiLz48L3N2Zz4=';
const eraseIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWVyYXNlciI+PHBhdGggZD0ibTcgMjEtNC4zLTQuM2MtMS0xLTEtMi41IDAtMy40bDkuNi05LjZjMS0xIDIuNS0xIDMuNCAwbDUuNiA1LjZjMSAxIDEgMi41IDAgMy40TDEzIDIxIi8+PHBhdGggZD0iTTIyIDIxSDciLz48cGF0aCBkPSJtNSAxMSA5IDkiLz48L3N2Zz4=';
const smallToolIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWRvdCI+PGNpcmNsZSBjeD0iMTIuMSIgY3k9IjEyLjEiIHI9IjEiLz48L3N2Zz4=';
const bigToolIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBsdXMiPjxwYXRoIGQ9Ik01IDEyaDE0Ii8+PHBhdGggZD0iTTEyIDV2MTQiLz48L3N2Zz4=';
const paperIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN0aWNreS1ub3RlIj48cGF0aCBkPSJNMTYgM0g1YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNGEyIDIgMCAwIDAgMi0yVjhaIi8+PHBhdGggZD0iTTE1IDN2NGEyIDIgMCAwIDAgMiAyaDQiLz48L3N2Zz4=';
const bucketIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBhaW50LWJ1Y2tldCI+PHBhdGggZD0ibTE5IDExLTgtOC04LjYgOC42YTIgMiAwIDAgMCAwIDIuOGw1LjIgNS4yYy44LjggMiAuOCAyLjggMEwxOSAxMVoiLz48cGF0aCBkPSJtNSAyIDUgNSIvPjxwYXRoIGQ9Ik0yIDEzaDE1Ii8+PHBhdGggZD0iTTIyIDIwYTIgMiAwIDEgMS00IDBjMC0xLjYgMS43LTIuNCAyLTQgLjMgMS42IDIgMi40IDIgNFoiLz48L3N2Zz4=';
const showIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjkiIGN5PSI5IiByPSIyIi8+PHBhdGggZD0ibTIxIDE1LTMuMDg2LTMuMDg2YTIgMiAwIDAgMC0yLjgyOCAwTDYgMjEiLz48L3N2Zz4=';
const hideIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlLW9mZiI+PGxpbmUgeDE9IjIiIHgyPSIyMiIgeTE9IjIiIHkyPSIyMiIvPjxwYXRoIGQ9Ik0xMC40MSAxMC40MWEyIDIgMCAxIDEtMi44My0yLjgzIi8+PGxpbmUgeDE9IjEzLjUiIHgyPSI2IiB5MT0iMTMuNSIgeTI9IjIxIi8+PGxpbmUgeDE9IjE4IiB4Mj0iMjEiIHkxPSIxMiIgeTI9IjE1Ii8+PHBhdGggZD0iTTMuNTkgMy41OUExLjk5IDEuOTkgMCAwIDAgMyA1djE0YTIgMiAwIDAgMCAyIDJoMTRjLjU1IDAgMS4wNTItLjIyIDEuNDEtLjU5Ii8+PHBhdGggZD0iTTIxIDE1VjVhMiAyIDAgMCAwLTItMkg5Ii8+PC9zdmc+';

// ----- Getters -----
const isReadyToDraw = () => useStore.getState().isReadyToDraw;
const isEraser = () => useStore.getState().isEraser;
const isBigTool = () => useStore.getState().isBigTool;
const isSelectingColor = () =>
  useStore.getState().colorReplacement.isSelectingColor;
const isImageHidden = () => useStore.getState().isImageHidden;

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
      shouldDeactivate: () => false,
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
      shouldDeactivate: () => !isReadyToDraw(),
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
      shouldDeactivate: () => !isReadyToDraw(),
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
      shouldDeactivate: () => false,
    },
    iconSrcMode1: paperIcon,
    iconSrcMode2: bucketIcon,
    tooltipMode1: 'Replace a color',
    tooltipMode2: 'Return to normal mode',
    labelMode1: 'Replace a color',
    labelMode2: 'Return to normal mode',
    isInMode2: isSelectingColor,
    switchToMode1: deactivateColorReplacement,
    switchToMode2: activateColorReplacement,
  },
  // ----- toggle-show-hide-image -----
  {
    id: 'toggle-show-hide-image',
    buttonStyle,
    deactivate: {
      subscribeToState: 'imageUrl',
      shouldDeactivate: () => !useStore.getState().imageUrl,
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
