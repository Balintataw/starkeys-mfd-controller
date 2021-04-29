const fs = require('fs')
const path = require('path')

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
)

module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['warn', prettierOptions],
    'import/no-extraneous-dependencies': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/button-has-type': 0,
    'react/no-array-index-key': 1,
    'react/jsx-one-expression-per-line': 0,
    'no-unused-vars': 1,
    'no-param-reassign': 0,
    // "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'no-console': 'off',
    'no-nested-ternary': 'off',
    'react/jsx-indent': [2, 2, { indentLogicalExpressions: true }],
    'react/react-in-jsx-scope': 'off',
  },
}
