import { test, expect } from '@playwright/test';

test.describe('Chat System (Self Chat)', () => {
  test('Chat001: Send a message to self and verify it shows in UI', async ({ page }) => {
    // Visit the chat route
    await page.goto('http://localhost:5173/chat');

    // Fill in and send a message
    const testMessage = 'Hello from Playwright!';
    await page.fill('input[placeholder="Type a message..."]', testMessage);
    await page.click('text=Send');

    // Confirm the message appears in chat
    await expect(page.locator('text=You (ID:')).toBeVisible();
    await expect(page.locator(`text=${testMessage}`)).toBeVisible();

    // Confirm input field is cleared after sending
    const inputValue = await page.locator('input[placeholder="Type a message..."]').inputValue();
    expect(inputValue).toBe('');
  });
});

