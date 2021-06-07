module.exports = {
  root: true,
  plugins: ['unused-imports', 'prettier'],
  extends: ['@react-native-community', 'prettier'],
  rules: {
    'react-native/no-inline-styles': 0,
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
  },
};
