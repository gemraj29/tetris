import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node', // Logic tests don't need a browser env
    },
});
