import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    
    // Include tests co-located with source code
    include: [
      'src/**/__tests__/**/*.test.ts',
    ],
    
    // Exclude patterns
    exclude: [
      'node_modules/**',
      'out/**',
      '**/*.d.ts',
    ],
    
    // Test timeout
    testTimeout: 10000,
    hookTimeout: 10000,
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/__tests__/**',
        'src/**/*.test.ts',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types.ts',
        'node_modules/**',
        'out/**',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 65,
        statements: 70,
      },
    },
  },
});

