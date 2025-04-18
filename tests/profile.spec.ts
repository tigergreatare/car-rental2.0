import { test, expect } from '@playwright/test';

test.describe('Profile Page Tests', () => {
  test('ProfilePage01: Go to Profile Page', async ({ page }) => {
    await page.goto('http://localhost:5173/profile');
    await expect(page).toHaveURL(/.*ProfilePage/);
    await expect(page.locator('text=My Profile')).toBeVisible();
  });

  test('ProfilePage02: Click Edit Profile button', async ({ page }) => {
    await page.goto('http://localhost:5173/profile');
    await page.click('text=Edit Profile');
    await expect(page.locator('input[name="full_name"]')).toBeVisible();
  });

  test('ProfilePage05: Change full name and verify update', async ({ page }) => {
    await page.goto('http://localhost:5173/profile');
  
    await page.click('text=Edit Profile');
  
    const newName = 'Test User ' + Date.now(); // unique name to verify update
  
    await page.fill('input[name="full_name"]', newName);
    await page.click('text=Save');
  
    // wait for the profile to return to view mode and show the new name
    await page.waitForSelector(`text=Full Name: ${newName}`);
  
    // confirm it's visible
    await expect(page.locator(`text=Full Name: ${newName}`)).toBeVisible();
  });
});