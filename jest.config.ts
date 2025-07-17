export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/test-utils/setupTests.ts'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.test.{js,jsx,ts,tsx}',
        '!src/**/*.spec.{js,jsx,ts,tsx}',
        '!src/index.{js,jsx,ts,tsx}',
        '!src/setupTests.{js,ts}',
        '!src/**/*.d.ts'
    ],
    "coverageThreshold": {
        "global": {
        "statements": 80,
        "branches": 50,
        "functions": 50,
        "lines": 50
        }
    }
}