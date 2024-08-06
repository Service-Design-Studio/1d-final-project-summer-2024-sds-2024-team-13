module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-stub'
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

