const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
    test: {
        environment: 'node',
        include: ['src/**/*.test.ts'],
        clearMocks: true,
        restoreMocks: true,
    },
});
