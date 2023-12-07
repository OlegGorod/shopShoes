import type {Config} from 'tailwindcss';

const config: Config = {
  prefix: 'tw-',
  important: true,
  corePlugins: {
    preflight: false,
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        shoe1: 'url(/images/shoe1.png)',
        shoe2: 'url(/images/shoe2.png)',
        shoe3: 'url(/images/shoe3.png)',
        profileCover: 'url(/images/profileCover.png)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        error500: 'url(/images/error500.png)',
        errorMobile500: 'url(/images/error500-mobile.png)',
      },
    },
  },
  plugins: [],
};
export default config;
