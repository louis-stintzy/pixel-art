import { AspectRatio } from '../@types/aspectRatio';

export const avaibleAspectRatios = {
  square: [
    {
      display: '1:1',
      value: 1,
      formats: [
        {
          display: '500x500',
          width: 500,
          height: 500,
          pixelSize: [5, 10, 20, 25, 50, 100, 125],
        },
        {
          display: '1000x1000',
          width: 1000,
          height: 1000,
          pixelSize: [10, 20, 25, 40, 50, 100, 125, 200],
        },
      ],
    },
  ],
  landscape: [
    {
      display: '16:9',
      value: 16 / 9,
      formats: [
        {
          display: '1280x720',
          width: 1280,
          height: 720,
          pixelSize: [8, 10, 16, 20, 40, 80],
        },
        {
          display: '1920x1080',
          width: 1920,
          height: 1080,
          pixelSize: [8, 10, 12, 15, 20, 24, 30, 40, 60, 120],
        },
      ],
    },
    {
      display: '3:2',
      value: 3 / 2,
      formats: [
        {
          display: '900x600',
          width: 900,
          height: 600,
          pixelSize: [10, 12, 15, 20, 25, 30, 50, 60, 75, 100, 150],
        },
        {
          display: '1200x800',
          width: 1200,
          height: 800,
          pixelSize: [8, 10, 16, 20, 25, 40, 50, 80, 100, 200],
        },
      ],
    },
    {
      display: '4:3',
      value: 4 / 3,
      formats: [
        {
          display: '800x600',
          width: 800,
          height: 600,
          pixelSize: [8, 10, 20, 25, 40, 50, 100],
        },
        {
          display: '1024x768',
          width: 1024,
          height: 768,
          pixelSize: [8, 16, 32, 64, 128],
        },
      ],
    },
    {
      display: '5:4',
      value: 5 / 4,
      formats: [
        {
          display: '1000x800',
          width: 1000,
          height: 800,
          pixelSize: [8, 10, 20, 25, 40, 50, 100, 200],
        },
        {
          display: '1500x1200',
          width: 1500,
          height: 1200,
          pixelSize: [10, 12, 15, 20, 25, 30, 50, 60, 75, 100, 150],
        },
      ],
    },
  ],
  portrait: [
    {
      display: '9:16',
      value: 9 / 16,
      formats: [
        {
          display: '720x1280',
          width: 720,
          height: 1280,
          pixelSize: [8, 10, 16, 20, 40, 80],
        },
        {
          display: '1080x1920',
          width: 1080,
          height: 1920,
          pixelSize: [8, 10, 12, 15, 20, 24, 30, 40, 60, 120],
        },
      ],
    },
    {
      display: '2:3',
      value: 2 / 3,
      formats: [
        {
          display: '600x900',
          width: 600,
          height: 900,
          pixelSize: [10, 12, 15, 20, 25, 30, 50, 60, 75, 100, 150],
        },
        {
          display: '800x1200',
          width: 800,
          height: 1200,
          pixelSize: [8, 10, 16, 20, 25, 40, 50, 80, 100, 200],
        },
      ],
    },
    {
      display: '3:4',
      value: 3 / 4,
      formats: [
        {
          display: '600x800',
          width: 600,
          height: 800,
          pixelSize: [8, 10, 20, 25, 40, 50, 100],
        },
        {
          display: '768x1024',
          width: 768,
          height: 1024,
          pixelSize: [8, 16, 32, 64, 128],
        },
      ],
    },
    {
      display: '4:5',
      value: 4 / 5,
      formats: [
        {
          display: '800x1000',
          width: 800,
          height: 1000,
          pixelSize: [8, 10, 20, 25, 40, 50, 100, 200],
        },
        {
          display: '1200x1500',
          width: 1200,
          height: 1500,
          pixelSize: [10, 12, 15, 20, 25, 30, 50, 60, 75, 100, 150],
        },
      ],
    },
  ],
  panoramic: [
    {
      display: '2:1',
      value: 2 / 1,
      formats: [
        {
          display: '1200x600',
          width: 1200,
          height: 600,
          pixelSize: [
            8, 10, 12, 15, 20, 24, 25, 30, 40, 50, 60, 75, 100, 120, 150,
          ],
        },
        {
          display: '1600x800',
          width: 1600,
          height: 800,
          pixelSize: [8, 10, 16, 20, 25, 32, 40, 50, 80, 100, 160, 200],
        },
      ],
    },
    {
      display: '65:24',
      value: 65 / 24,
      formats: [
        {
          display: '1300x480',
          width: 1300,
          height: 480,
          pixelSize: [5, 10, 20],
        },
        {
          display: '1950x720',
          width: 1950,
          height: 720,
          pixelSize: [6, 10, 15, 30],
        },
      ],
    },
    {
      display: '3:1',
      value: 3 / 1,
      formats: [
        {
          display: '1200x400',
          width: 1200,
          height: 400,
          pixelSize: [8, 10, 16, 20, 25, 40, 50, 80, 100],
        },
        {
          display: '1800x600',
          width: 1800,
          height: 600,
          pixelSize: [
            8, 10, 12, 15, 20, 24, 25, 30, 40, 50, 60, 75, 100, 120, 150,
          ],
        },
      ],
    },
  ],
};

export const resetAspectRatio: AspectRatio = {
  display: '4:3',
  value: 4 / 3,
  formats: [
    {
      display: '800x600',
      width: 800,
      height: 600,
      pixelSize: [8, 10, 20, 25, 40, 50, 100],
    },
    {
      display: '1024x768',
      width: 1024,
      height: 768,
      pixelSize: [8, 16, 32, 64, 128],
    },
  ],
};
