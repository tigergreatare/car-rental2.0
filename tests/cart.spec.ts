import { test, expect } from '@playwright/test';

const carId = 12; // Make sure this car_id exists in your DB
const baseURL = 'http://localhost:5173';

test.describe('Shopping Cart Integration Test', () => {
  test('Cart001: Add item from car detail and verify in cart', async ({ page }) => {
    // 1. Go to the Car Detail page
    await page.goto(`${baseURL}/cardetail/${carId}`);
    await page.waitForSelector('text=Add to Cart');

    // 2. Click "Add to Cart"
    await page.click('text=Add to Cart');

    // Wait for the cart state to update (adjust timeout as needed)
    await page.waitForTimeout(1500);

    // Optional: Log the cart contents from localStorage for debugging
    const cartContent = await page.evaluate(() => localStorage.getItem('cart'));
    console.log("Cart content:", cartContent);

    // 3. Navigate to the Shopping Cart page
    await page.goto(`${baseURL}/Shopping-cart`);

    // 4. Verify that the "Your cart is empty" message is no longer present
    await expect(page.locator('text=Your cart is empty')).toHaveCount(0);

    // 5. Confirm that the cart displays the cart item details
    await expect(page.locator('h1')).toHaveText('My Shopping Cart');
    // Checks that a price (formatted like "$[number] / day") is visible
    await expect(page.locator('text=/\\$[0-9]+\\/ day/')).toBeVisible();
    // Ensure a Remove button is visible
    await expect(page.locator('text=Remove')).toBeVisible();
  });
});

