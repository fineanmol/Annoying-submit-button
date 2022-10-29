module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'linebreak-style': 0,
    'jsx-a11y/tabindex-no-positive': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': [0],
    'react/jsx-no-target-blank': [0],
    'react/no-unescaped-entities': [0],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    // disabled those rules to be able for build now, need to fix all issue and enable again
    'react/react-in-jsx-scope': [0],
    'react/prop-types': [0],
    'import/prefer-default-export': 'off',
    'react-hooks/exhaustive-deps': 0,
    'import/no-unresolved': 'off',
    'import/no-named-as-default': 'warn',
  },
}
