module.exports = {
  globals: {
    JSX: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'eslint:recommended', 'next'],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // common rules
    'no-unused-vars': 'off',
    'comma-dangle': ['error', 'only-multiline'],
    eqeqeq: 'error',
    'no-else-return': 'error',
    'no-multi-spaces': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    camelcase: [
      'error',
      {
        ignoreImports: true,
        ignoreDestructuring: true,
        properties: 'always',
      },
    ],
    'no-lonely-if': 'error',
    'no-mixed-operators': 'error',
    'no-multi-assign': 'error',
    'no-nested-ternary': 'error',
    'no-plusplus': 'error',
    'no-unneeded-ternary': ['error'],
    'one-var': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
    ],
    'no-var': 'error',
    'prefer-const': 'error',

    // react rules
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'react/no-array-index-key': 'error',
    'react/react-in-jsx-scope': 'off',

    // comments rules
    'sort-vars': ['error', { ignoreCase: true }],
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    // typescript rules
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    //import rules
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/default': 'off',
    'import/export': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'external'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    //next
    '@next/next/link-passhref': 'off',

    //prettier rules
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
