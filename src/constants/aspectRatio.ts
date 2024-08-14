import { AspectRatio } from '../@types/aspectRatio';

export const avaibleAspectRatios = {
  square: [
    {
      display: '1:1',
      value: 1,
      formats: [
        {
          display: '400x400',
          width: 400,
          height: 400,
          pixelSize: [10, 20, 25, 40, 50],
        },
        {
          display: '500x500',
          width: 500,
          height: 500,
          pixelSize: [10, 20, 25, 50, 100],
        },
        {
          display: '700x700',
          width: 700,
          height: 700,
          pixelSize: [10, 14, 28, 35, 50, 70, 100],
        },
        {
          display: '1080x1080',
          width: 1080,
          height: 1080,
          pixelSize: [15, 18, 20, 24, 27, 30, 36, 40, 45, 54, 60, 72, 90],
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
          display: '640x360',
          width: 640,
          height: 360,
          pixelSize: [10, 20, 40],
        },
        {
          display: '1280x720',
          width: 1280,
          height: 720,
          pixelSize: [16, 20, 40, 80],
        },
        {
          display: '1600x900',
          width: 1600,
          height: 900,
          pixelSize: [20, 25, 50, 100],
        },
        {
          display: '1920x1080',
          width: 1920,
          height: 1080,
          pixelSize: [20, 24, 30, 40, 60],
        },
      ],
    },
    {
      display: '16:10',
      value: 16 / 10,
      formats: [
        {
          display: '800x500',
          width: 800,
          height: 500,
          pixelSize: [10, 20, 25, 50],
        },
        {
          display: '1280x800',
          width: 1280,
          height: 800,
          pixelSize: [16, 20, 32, 40, 80],
        },
        {
          display: '1600x1000',
          width: 1600,
          height: 1000,
          pixelSize: [20, 25, 40, 50, 100],
        },
        {
          display: '1920x1200',
          width: 1920,
          height: 1200,
          pixelSize: [20, 24, 30, 40, 48, 60, 80],
        },
      ],
    },
    {
      display: '3:2',
      value: 3 / 2,
      formats: [
        {
          display: '600x400',
          width: 600,
          height: 400,
          pixelSize: [10, 20, 25, 40, 50, 100],
        },
        {
          display: '900x600',
          width: 900,
          height: 600,
          pixelSize: [10, 12, 15, 20, 25, 30, 50, 60, 75, 100],
        },
        {
          display: '1200x800',
          width: 1200,
          height: 800,
          pixelSize: [16, 20, 25, 40, 50, 80, 100],
        },
        {
          display: '1380x920',
          width: 1380,
          height: 920,
          pixelSize: [20, 23, 46, 92],
        },
      ],
    },
    {
      display: '4:3',
      value: 4 / 3,
      formats: [
        {
          display: '512x384',
          width: 1024,
          height: 768,
          pixelSize: [16, 32, 64],
        },
        {
          display: '800x600',
          width: 800,
          height: 600,
          pixelSize: [10, 20, 25, 40, 50, 100],
        },
        {
          display: '1024x768',
          width: 1024,
          height: 768,
          pixelSize: [16, 32, 64],
        },
      ],
    },
    {
      display: '5:4',
      value: 5 / 4,
      formats: [
        {
          display: '675x540',
          width: 1000,
          height: 800,
          pixelSize: [15, 27, 35],
        },
        {
          display: '1000x800',
          width: 1000,
          height: 800,
          pixelSize: [20, 25, 40, 50, 100, 200],
        },
        {
          display: '1350x1080',
          width: 1350,
          height: 1080,
          pixelSize: [15, 18, 27, 30, 45, 54, 90],
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
          display: '360x640',
          width: 360,
          height: 640,
          pixelSize: [10, 20, 40],
        },
        {
          display: '720x1280',
          width: 720,
          height: 1280,
          pixelSize: [16, 20, 40, 80],
        },
        {
          display: '900x1600',
          width: 900,
          height: 1600,
          pixelSize: [20, 25, 50, 100],
        },
        {
          display: '1080x1920',
          width: 1080,
          height: 1920,
          pixelSize: [20, 24, 30, 40, 60],
        },
      ],
    },
    {
      display: '10:16',
      value: 10 / 16,
      formats: [
        {
          display: '500x800',
          width: 500,
          height: 800,
          pixelSize: [10, 20, 25, 50],
        },
        {
          display: '800x1280',
          width: 800,
          height: 1280,
          pixelSize: [16, 20, 32, 40, 80],
        },
        {
          display: '1000x1600',
          width: 1000,
          height: 1600,
          pixelSize: [20, 25, 40, 50, 100],
        },
        {
          display: '1200x1920',
          width: 1200,
          height: 1920,
          pixelSize: [20, 24, 30, 40, 48, 60, 80],
        },
      ],
    },
    {
      display: '2:3',
      value: 2 / 3,
      formats: [
        {
          display: '400x600',
          width: 400,
          height: 600,
          pixelSize: [10, 20, 25, 40, 50, 100],
        },
        {
          display: '600x900',
          width: 600,
          height: 900,
          pixelSize: [10, 12, 15, 20, 25, 30, 50, 60, 75, 100],
        },
        {
          display: '800x1200',
          width: 800,
          height: 1200,
          pixelSize: [16, 20, 25, 40, 50, 80, 100],
        },
        {
          display: '920x1380',
          width: 920,
          height: 1380,
          pixelSize: [20, 23, 46, 92],
        },
      ],
    },
    {
      display: '3:4',
      value: 3 / 4,
      formats: [
        {
          display: '384x512',
          width: 384,
          height: 512,
          pixelSize: [16, 32, 64],
        },
        {
          display: '600x800',
          width: 600,
          height: 800,
          pixelSize: [10, 20, 25, 40, 50, 100],
        },
        {
          display: '768x1024',
          width: 768,
          height: 1024,
          pixelSize: [16, 32, 64],
        },
      ],
    },
    {
      display: '4:5',
      value: 4 / 5,
      formats: [
        {
          display: '540x675',
          width: 540,
          height: 675,
          pixelSize: [15, 27, 35],
        },
        {
          display: '800x1000',
          width: 800,
          height: 1000,
          pixelSize: [20, 25, 40, 50, 100, 200],
        },
        {
          display: '1080x1350',
          width: 1080,
          height: 1350,
          pixelSize: [15, 18, 27, 30, 45, 54, 90],
        },
      ],
    },
  ],
  panoramic: [
    {
      display: '1.91:1',
      value: 1.91 / 1,
      formats: [
        {
          display: '600x315',
          width: 600,
          height: 315,
          pixelSize: [15],
        },
        {
          display: '1200x630',
          width: 1200,
          height: 630,
          pixelSize: [15, 30],
        },
      ],
    },
    {
      display: '2:1',
      value: 2 / 1,
      formats: [
        {
          display: '800x400',
          width: 800,
          height: 400,
          pixelSize: [10, 16, 20, 25, 40, 50, 80, 100],
        },
        {
          display: '1200x600',
          width: 1200,
          height: 600,
          pixelSize: [12, 15, 20, 24, 25, 30, 40, 50, 60, 75, 100],
        },
        {
          display: '1600x800',
          width: 1600,
          height: 800,
          pixelSize: [16, 20, 25, 32, 40, 50, 80, 100],
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
          pixelSize: [10, 20],
        },
        {
          display: '1950x720',
          width: 1950,
          height: 720,
          pixelSize: [15, 30],
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
          pixelSize: [10, 16, 20, 25, 40, 50, 80, 100],
        },
        {
          display: '1800x600',
          width: 1800,
          height: 600,
          pixelSize: [15, 20, 24, 25, 30, 40, 50, 60, 75, 100],
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
