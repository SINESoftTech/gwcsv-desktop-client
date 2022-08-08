module.exports = {
  env: {
    commonjs: true,
  },
  ignorePatterns: ['third_party_lib/*.*'],
  plugins: [],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "react-app",
    "react-app/jest"
  ]
}
