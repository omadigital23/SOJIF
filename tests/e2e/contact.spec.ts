import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
    test('should navigate to contact page', async ({ page }) => {
        await page.goto('/contact');
        expect(page).toHaveTitle(/Contact/i);
    });

    test('should fill and submit contact form', async ({ page }) => {
        await page.goto('/contact');

        // Fill the form
        await page.fill('input[name="firstName"]', 'John');
        await page.fill('input[name="lastName"]', 'Doe');
        await page.fill('input[name="email"]', 'john@example.com');
        await page.fill('input[name="phone"]', '+33612345678');
        await page.fill('input[name="subject"]', 'Test Subject');
        await page.fill('textarea[name="message"]', 'This is a test message for the contact form.');

        // Submit the form
        await page.click('button[type="submit"]');

        // Wait for success message
        await page.waitForSelector('[role="alert"]');
        const alert = page.locator('[role="alert"]');
        await expect(alert).toContainText(/reçu|success/i);
    });

    test('should validate required fields', async ({ page }) => {
        await page.goto('/contact');

        // Try to submit without filling required fields
        await page.click('button[type="submit"]');

        // Check for validation errors
        const inputs = page.locator('input[required]');
        const count = await inputs.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should validate email format', async ({ page }) => {
        await page.goto('/contact');

        // Fill with invalid email
        await page.fill('input[name="email"]', 'not-an-email');
        await page.fill('input[name="firstName"]', 'Test');
        await page.fill('input[name="lastName"]', 'User');
        await page.fill('input[name="phone"]', '+33612345678');
        await page.fill('input[name="subject"]', 'Test');
        await page.fill('textarea[name="message"]', 'Test message');

        // Check for email validation
        const emailInput = page.locator('input[name="email"]');
        const validity = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
        expect(validity).toBe(true);
    });
});
