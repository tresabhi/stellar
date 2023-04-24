module.exports = {
  root: true,

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/jsx-runtime',
    'plugin:json/recommended',
    'prettier',
  ],

  rules: {
    'react/jsx-props-no-spreading': 0,

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
    'react/no-unknown-property': 0,

    /**
     * Conflicts with nodejs imports.
     */
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

    /**
     * Conflicts with vite's mighty dependency resolver. Isn't an issue so it
     * shouldn't be flagged. Plus, disabling this saves a lot of lint time.
     */
    'import/no-cycle': 0,

    /**
     * Conflicts with component folders.
     */
    'import/prefer-default-export': 0,

    /**
     * TypeScript does a good job of making sure props don't work without
     * defaults. React's run-time default props management is unnecessary as
     * there is really no uncontrolled props being passed anyway.
     */
    'react/require-default-props': 0,

    /**
     * Tooling is sufficiently advanced to work around this.
     */
    'no-plusplus': 0,

    /**
     * No 3rd party will be using these components; hence, TypeScript is
     * enough for type validation.
     */
    'react/prop-types': 0,

    /**
     * JSON naming convention conflicts with TypeScript.
     */
    '@typescript-eslint/naming-convention': 0,
  },

  plugins: ['@typescript-eslint'],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
