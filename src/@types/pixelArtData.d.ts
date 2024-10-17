import { Color } from './colorPalette';

export type PixelArtData = {
  pixelArtToken: string;
  user: {
    id: number;
    username: string;
  };
  name: string;
  description: string;
  gridSize: {
    width: number;
    height: number;
    pixelSize: number;
  };
  gridColor: {
    background: string;
    line: string;
  };
  gridPrinting: 'none' | 'pixel' | 'full';
  pixelColors: Record<string, string>;
  imageUrl: string | undefined;
  date: string;
  version: string;
};
