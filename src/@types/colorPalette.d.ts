import colorPalettes from '../constants/colors';

export type Color = { name: string; code: string };
export type PaletteNameCamelCase = keyof typeof colorPalettes;
export type PaletteName = (typeof colorPalettes)[PaletteNameCamelCase]['name'];
