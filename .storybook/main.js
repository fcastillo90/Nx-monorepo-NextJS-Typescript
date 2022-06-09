const path = require('path');

module.exports = {
  stories: [],
  addons: ['@storybook/addon-essentials'],
  // babel: async (options) => {
  //   return {
  //     ...options,
  //     presets: [...options.presets, '@babel/preset-react'],
  //   };
  // },
  // uncomment the property below if you want to apply some webpack config globally
  webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need that should apply to all storybook configs
    config.resolve.alias = {
      ...config.resolve.alias,
      '@fcastillo90/constants': path.resolve(__dirname, '../libs/constants/src/index.ts'),
      '@fcastillo90/netflix-ui': path.resolve(__dirname, '../libs/netflix-ui/src/index.ts'),
      '@fcastillo90/types': path.resolve(__dirname, '../libs/types/src/index.ts'),
      '@fcastillo90/mock': path.resolve(__dirname, '../libs/mock/src/index.ts'),
    }
    // Return the altered config
    return config;
  },
};
