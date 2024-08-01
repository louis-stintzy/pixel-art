const avaibleAspectRatios = {
  square: [
    {
      display: '1:1',
      value: 1,
      formats: [
        { display: '500x500', width: 500, height: 500 },
        { display: '1000x1000', width: 1000, height: 1000 },
      ],
    },
  ],
  landscape: [
    {
      display: '16:9',
      value: 16 / 9,
      formats: [
        { display: '1280x720', width: 1280, height: 720 },
        { display: '1920x1080', width: 1920, height: 1080 },
      ],
    },
    {
      display: '3:2',
      value: 3 / 2,
      formats: [
        { display: '1200x800', width: 1200, height: 800 },
        { display: '1800x1200', width: 1800, height: 1200 },
      ],
    },
    {
      display: '4:3',
      value: 4 / 3,
      formats: [
        { display: '800x600', width: 800, height: 600 },
        { display: '1024x768', width: 1024, height: 768 },
      ],
    },
    {
      display: '5:4',
      value: 5 / 4,
      formats: [
        { display: '1250x1000', width: 1250, height: 1000 },
        { display: '1500x1200', width: 1500, height: 1200 },
      ],
    },
  ],
  portrait: [
    {
      display: '9:16',
      value: 9 / 16,
      formats: [
        { display: '720x1280', width: 720, height: 1280 },
        { display: '1080x1920', width: 1080, height: 1920 },
      ],
    },
    {
      display: '2:3',
      value: 2 / 3,
      formats: [
        { display: '600x900', width: 600, height: 900 },
        { display: '800x1200', width: 800, height: 1200 },
      ],
    },
    {
      display: '3:4',
      value: 3 / 4,
      formats: [
        { display: '600x800', width: 600, height: 800 },
        { display: '768x1024', width: 768, height: 1024 },
      ],
    },
    {
      display: '4:5',
      value: 4 / 5,
      formats: [
        { display: '800x1000', width: 800, height: 1000 },
        { display: '1200x1500', width: 1200, height: 1500 },
      ],
    },
  ],
  panoramic: [
    {
      display: '2:1',
      value: 2 / 1,
      formats: [
        { display: '1600x800', width: 1600, height: 800 },
        { display: '3200x1600', width: 3200, height: 1600 },
      ],
    },
    {
      display: '65:24',
      value: 65 / 24,
      formats: [
        { display: '1300x480', width: 1300, height: 480 },
        { display: '2600x960', width: 2600, height: 960 },
      ],
    },
    {
      display: '3:1',
      value: 3 / 1,
      formats: [
        { display: '1800x600', width: 1800, height: 600 },
        { display: '2400x800', width: 2400, height: 800 },
      ],
    },
  ],
};

export type Orientation = keyof typeof avaibleAspectRatios;
export type AspectRatio = {
  display: string;
  value: number;
  formats: { display: string; width: number; height: number }[];
};
export default avaibleAspectRatios;
