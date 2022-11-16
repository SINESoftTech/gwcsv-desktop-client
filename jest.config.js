const config = {
  testEnvironment:'jsdom',
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)'
  ],

}

module.exports = config