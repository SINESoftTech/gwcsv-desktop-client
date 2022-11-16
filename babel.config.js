module.exports = {
  presets: [
    [
    '@babel/preset-env',
      {
        "modules":"auto",
        "targets": {
          "node": true
        }
      }
    ],
    ['@babel/preset-react', {runtime: 'automatic'}],
  ],
};