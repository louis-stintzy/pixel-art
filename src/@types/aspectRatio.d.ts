export type Orientation = 'square' | 'landscape' | 'portrait' | 'panoramic';
export type Format = {
  display: string;
  width: number;
  height: number;
  pixelSize: number[];
};
export type Formats = Format[];
export type AspectRatio = {
  display: string;
  value: number;
  formats: Formats;
};
