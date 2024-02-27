import range from 'lodash/range';
const pxToRem = (px, base = 16) => `${px / base}rem`;

const pxToRemFunc = (start, end) => {
  return range(start, end).reduce((acc, px) => {
    acc[`${px}px`] = pxToRem(px);
    return acc;
  }, {});
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        ...pxToRemFunc(1, 1000),
      },
      inset: {
        ...pxToRemFunc(1, 1000),
      },
      fontSize: {
        ...pxToRemFunc(1, 1000),
      },
      lineHeight: {
        ...pxToRemFunc(1, 1000),
      },
      borderRadius: {
        ...pxToRemFunc(1, 1000),
      },
      screens: {
        mobile: '360px',
        tablet: '768px',
        desktop: '1280px',
      },
      colors: {
        primary: 'rgba(71, 133, 255, 1)',
        secondary: 'rgba(255, 107, 87, 1)',
        black40: 'rgba(0, 0, 0, 0.45)',
        'skyblue-100': 'rgba(241, 248, 255, 1)',
        'skyblue-300': 'rgba(225, 239, 255, 1)',
        'skyblue-400': 'rgba(174, 207, 255, 1)',
        'gray-100': 'rgba(245, 245, 245, 1)',
        'gray-200': 'rgba(241, 241, 241, 1)',
        'gray-300': 'rgba(228, 228, 228, 1)',
        'gray-350': 'rgba(188, 188, 188, 1)',
        'gray-400': 'rgba(152, 152, 152, 1)',
        'gray-450': 'rgba(117, 117, 117, 1)',
        'gray-500': 'rgba(102, 102, 102, 1)',
        'gray-700': 'rgba(73, 73, 73, 1)',
      },
    },
    fontFamily: {
      sans: ['OAGothic', 'noto-sans-kr', 'sans-serif'],
    },
  },
  plugins: [],
};
