module.exports = {
  root: true,

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/jsx-runtime',
  ],

  rules: {
    'react/jsx-props-no-spreading': 'off',
    /**
     * Conflicts with immer
     */
    'no-param-reassign': [
      'error',
      { ignorePropertyModificationsFor: ['draft'] },
    ],
    /**
     * Conflicts with react three fiber props. Should be handled by typescript
     * anyway.
     */
    'react/no-unknown-property': [0],
    /**
     * Conflicts with nodejs imports.
     */
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    /**
     * Conflicts with vite's mighty dependency resolver. Isn't an issue so it
     * shouldn't be flagged. Plus, disabling this saves a lot of lint time.
     */
    'import/no-cycle': [0],
  },

  plugins: ['@typescript-eslint'],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
