module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    "^axios$": "axios/dist/node/axios.cjs"
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)'  // Transform axios in node_modules
  ],
  testEnvironment: 'jsdom'
};

