import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests', // Folder where your test files will go
  timeout: 30 * 1000,
  use: {
    baseURL: 'http://localhost:3000', // <-- change this if your front-end runs on another port
    headless: true,
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
