import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
  test('HomePage-001: Go to homepage', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page).toHaveURL('http://localhost:5173/');
  });

  test('HomePage-005: Check for login/signup buttons', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.locator('text=SignIn🔑')).toBeVisible();
  });
});