# Test info

- Name: Payment Page Tests >> PaymentPage01: Load payment form and fill fields
- Location: C:\Users\alaad\Desktop\car-rental\tests\payment.spec.ts:6:7

# Error details

```
Error: expect.toHaveText: Error: strict mode violation: locator('h1') resolved to 3 elements:
    1) <h1>BookMyCar🚗</h1> aka getByRole('heading', { name: 'BookMyCar🚗' })
    2) <h1>…</h1> aka getByRole('heading', { name: 'BMW X5 (2018)' })
    3) <h1 class="main_head">Payment Form</h1> aka getByRole('heading', { name: 'Payment Form' })

Call log:
  - expect.toHaveText with timeout 5000ms
  - waiting for locator('h1')

    at C:\Users\alaad\Desktop\car-rental\tests\payment.spec.ts:9:38
```

# Page snapshot

```yaml
- heading "BookMyCar🚗" [level=1]
- textbox "Search for a car..."
- button:
  - img
- navigation:
  - link "Home🏠":
    - /url: /
  - link "SignIn🔑":
    - /url: /signin
  - link "Post car🚗":
    - /url: /Post-car
  - link "Profile👤":
    - /url: /profile
  - link "Chat✉️":
    - /url: /chat
  - link "Shopping cart🛒":
    - /url: /Shopping-cart
- img "BMW X5"
- heading "BMW X5 (2018)" [level=1]
- paragraph: "Color: White"
- paragraph: "Mileage: 32000 km"
- paragraph: "Fuel Type: Diesel"
- paragraph: "Transmission: Automatic"
- paragraph: "Status:"
- paragraph: $ / day
- button "Rent Now"
- button "Add to Cart"
- heading "Payment Form" [level=1]
- separator
- heading "Contact Information" [level=2]
- paragraph:
  - text: "Name:"
  - textbox
- paragraph:
  - text: "Address:"
  - textbox
- paragraph:
  - text: "Email:"
  - textbox
- separator
- heading "Payment Information" [level=2]
- paragraph:
  - text: "Card Type:"
  - combobox:
    - option "--Select a Card Type--" [selected]
    - option "Visa"
    - option "Mastercard"
- paragraph:
  - text: "Card Number:"
  - spinbutton
- paragraph:
  - text: "Expiration Date:"
  - textbox
- paragraph:
  - text: "CVV:"
  - textbox
- button "Pay Now"
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Payment Page Tests', () => {
   4 |   const paymentURL = 'http://localhost:5173/cardetail/12/payment';
   5 |
   6 |   test('PaymentPage01: Load payment form and fill fields', async ({ page }) => {
   7 |     await page.goto(paymentURL);
   8 |
>  9 |     await expect(page.locator('h1')).toHaveText('Payment Form');
     |                                      ^ Error: expect.toHaveText: Error: strict mode violation: locator('h1') resolved to 3 elements:
  10 |
  11 |     await page.fill('input[name="name"]', 'John Doe');
  12 |     await page.fill('textarea[name="address"]', '123 Test St, Testville');
  13 |     await page.fill('input[name="email"]', 'john@example.com');
  14 |     await page.selectOption('select[name="cardType"]', 'visa');
  15 |     await page.fill('input[name="cardNumber"]', '4111111111111111');
  16 |     await page.fill('input[name="expDate"]', '2026-12-31');
  17 |     await page.fill('input[name="cvv"]', '123');
  18 |
  19 |     // Optional: assert that the submit button is visible
  20 |     await expect(page.locator('input[type="submit"]')).toBeVisible();
  21 |   });
  22 |
  23 |   test('PaymentPage02: Submit invalid credit card and expect failure', async ({ page }) => {
  24 |     await page.goto(paymentURL);
  25 |
  26 |     // Fill with invalid card data
  27 |     await page.fill('input[name="name"]', 'Fake User');
  28 |     await page.fill('textarea[name="address"]', '456 Nowhere St');
  29 |     await page.fill('input[name="email"]', 'fake@example.com');
  30 |     await page.selectOption('select[name="cardType"]', 'mastercard');
  31 |     await page.fill('input[name="cardNumber"]', '0000000000000000');
  32 |     await page.fill('input[name="expDate"]', '2026-01-01');
  33 |     await page.fill('input[name="cvv"]', '999');
  34 |
  35 |     // Intercept alert popup
  36 |     page.once('dialog', async dialog => {
  37 |       expect(dialog.message()).toMatch(/Payment (successful|failed)/);
  38 |       await dialog.dismiss(); // close the alert
  39 |     });
  40 |
  41 |     await page.click('input[type="submit"]');
  42 |   });
  43 | });
  44 |
```