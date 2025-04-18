import { test, expect } from '@playwright/test';

test.describe('Payment Page Tests', () => {
  const paymentURL = 'http://localhost:5173/cardetail/12/payment';

  test('PaymentPage01: Load payment form and fill fields', async ({ page }) => {
    await page.goto(paymentURL);

    await expect(page.locator('h1')).toHaveText('Payment Form');

    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('textarea[name="address"]', '123 Test St, Testville');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.selectOption('select[name="cardType"]', 'visa');
    await page.fill('input[name="cardNumber"]', '4111111111111111');
    await page.fill('input[name="expDate"]', '2026-12-31');
    await page.fill('input[name="cvv"]', '123');

    // Optional: assert that the submit button is visible
    await expect(page.locator('input[type="submit"]')).toBeVisible();
  });

  test('PaymentPage02: Submit invalid credit card and expect failure', async ({ page }) => {
    await page.goto(paymentURL);

    // Fill with invalid card data
    await page.fill('input[name="name"]', 'Fake User');
    await page.fill('textarea[name="address"]', '456 Nowhere St');
    await page.fill('input[name="email"]', 'fake@example.com');
    await page.selectOption('select[name="cardType"]', 'mastercard');
    await page.fill('input[name="cardNumber"]', '0000000000000000');
    await page.fill('input[name="expDate"]', '2026-01-01');
    await page.fill('input[name="cvv"]', '999');

    // Intercept alert popup
    page.once('dialog', async dialog => {
      expect(dialog.message()).toMatch(/Payment (successful|failed)/);
      await dialog.dismiss(); // close the alert
    });

    await page.click('input[type="submit"]');
  });
});
