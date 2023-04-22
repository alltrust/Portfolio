import type { Config } from '@jest/types';

const basePagesDir = '<rootDir>/pages';
const baseComponentsDir = '<rootDir>/components';
const baseTestDir = '<rootDir>/__tests__';

const config: Config.InitialOptions ={
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  coverageProvider: 'v8',
  collectCoverage: true,
  collectCoverageFrom:[
    `${basePagesDir}/**/*.(ts|tsx)`,
    `${baseComponentsDir}/**/*.(ts|tsx)`,
    '!**/*.d.ts',
  ],
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.pnp\\.[^\\/]+$',
  ],
  testMatch:[
    `${baseTestDir}/**/*test.tsx`
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};

export default config;