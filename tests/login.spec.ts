import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:5173';

test.describe('User Login Page', () => {
  test('UserLoginPage-001: Login with valid credentials', async ({ page }) => {
    await page.goto(`${baseURL}/signin`);
    await page.waitForSelector('input[name="email"]');

    await page.fill('input[name="email"]', 'alaamorroco@gmail.com');
    await page.fill('input[name="password"]', '0606');
    await page.click('button[type="submit"]');

    page.once('dialog', async (dialog) => {
        expect(dialog.message()).toContain('Login successful!');
        await dialog.dismiss();
      });

    
  });

  test('UserLoginPage-002: Login with incorrect password', async ({ page }) => {
    await page.goto(`${baseURL}/signin`);
    await page.waitForSelector('input[name="email"]');

    await page.fill('input[name="email"]', 'alaamorroco@gmail.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Wait for the alert to appear
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Invalid email or password');
      await dialog.dismiss();
    });
  });

  test('UserLoginPage-003: Navigate to Signup Page', async ({ page }) => {
    await page.goto(`${baseURL}/signin`);
    await page.waitForSelector('text=Go to Signup');
    await page.click('text=Go to Signup');

    await page.waitForURL(`${baseURL}/signup`);
    await expect(page).toHaveURL(`${baseURL}/signup`);
  });
});

