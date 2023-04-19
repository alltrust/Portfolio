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
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
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