export default [{
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExports: true },
    ],
  },
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    es2020: true,
    node: true
  }
}];