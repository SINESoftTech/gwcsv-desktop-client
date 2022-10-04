module.exports = {
  env: {
    commonjs: true,
  },
  ignorePatterns: ['third_party_lib/*.*'],
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 'off',
  },
  extends: [
    // 'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'react-app',
    'react-app/jest',
  ],
};
