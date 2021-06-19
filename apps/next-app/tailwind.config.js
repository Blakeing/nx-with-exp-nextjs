const { createGlobPatternsOfDependentProjects } = require('@nrwl/next');

module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  purge: [
    './apps/next-app/pages/**/*.{js,ts,jsx,tsx}',
    './apps/next-app/components/**/*.{js,ts,jsx,tsx}',
    ...createGlobPatternsOfDependentProjects('next-app'),
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
