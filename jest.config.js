module.exports = {
    roots: ['<rootDir>/src'],
  
    testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  
    testEnvironment: 'node',
  
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },    
  
    modulePathIgnorePatterns: ['<rootDir>/build/'],
  
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.ts'],
  };  