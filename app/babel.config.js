module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  overrides: [
    {
      test: './node_modules/ethers',
      plugins: [
        '@babel/plugin-proposal-private-property-in-object',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods',
      ],
    },
  ],
};
