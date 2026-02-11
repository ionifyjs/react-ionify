import { defineConfig } from 'ionify';

export default defineConfig({
  // Phase 5.4.2: Test root option (defaults to config directory if omitted)
  // No need for process.cwd() - Ionify handles it internally
  entry: '/src/main.tsx',
  resolve: {
    alias: {
      '@core': '/core'
    },
    // Phase 5.4.2: Test resolve options
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    conditions: ['import', 'module', 'browser', 'default'],
    mainFields: ['module', 'jsnext:main', 'jsnext', 'main']
  },
  
  // Phase 5.4.2: Test optimizeDeps.include pre-warming
  optimizeDeps: {
    include: ['lodash', '@radix-ui/react-dialog'],
  },
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0'),
    __API_URL__: JSON.stringify('https://api.example.com'),
  }
});
