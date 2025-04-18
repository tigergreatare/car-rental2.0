import { test, expect } from '@playwright/test';

const carId = 12; // Make sure this car_id exists in your DB
const baseURL = `http://localhost:5173/cardetail/${carId}`;

test.describe('Car Detail Page Tests', () => {
  test('CarDetails001: Load car detail page and display info', async ({ page }) => {
    await page.goto(baseURL);

    // Wait for title like: Toyota Corolla (2020)
    await expect(page.locator('h1')).toContainText(/\(.+\)/);
    await expect(page.locator('text=/\\$[0-9]+ \\/ day/')).toBeVisible(); // price check
  });

  test('CarDetails002: Rent Now navigates to payment page', async ({ page }) => {
    await page.goto(baseURL);

    await page.click('text=Rent Now');

    await page.waitForURL(`**/cardetail/${carId}/payment`);
    await expect(page).toHaveURL(new RegExp(`/cardetail/${carId}/payment`));
  });

  test('CarDetails003: Reviews show correctly for the car', async ({ page }) => {
    await page.goto(baseURL);

    const reviewCount = await page.locator('.carcontainer-review').count();
    expect(reviewCount).toBeGreaterThan(0);
  });
});
