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
        mobile: '375px',
        tablet: '768px',
        desktop: '1280px',
      },
      colors: {
        primary: '#4785ff',
        secondary: '#ff6b57',
        black40: '#00000045',
        'skyblue-100': '#f1f8ff',
        'skyblue-300': '#e1efff',
        'skyblue-400': '#aecfff',
        'gray-100': '#f5f5f5',
        'gray-200': '#f1f1f1',
        'gray-300': '#e4e4e4',
        'gray-350': '#bcbcbc',
        'gray-400': '#989898',
        'gray-450': '#757575',
        'gray-500': '#666666',
        'gray-700': '#494949',
      },
      fontFamily: {
        sans: ['OAGothic', 'noto-sans-kr', 'sans-serif'],
      },
    },
    plugins: [],
  },
};
