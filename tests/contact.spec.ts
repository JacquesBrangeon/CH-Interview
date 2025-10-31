import { test, expect } from '@playwright/test';

test.describe('Contact Scenarios', () => {
    test.beforeEach(async({ page }) => {
        // Login as an admin prior to the beginning of each test
        await page.goto('https://automationintesting.online/admin');
        await page.getByRole('textbox', { name: 'Username' }).fill('admin');
        await page.getByRole('textbox', { name: 'Password' }).fill('password');
        await page.getByRole('button', { name: 'Login' }).click();
    })    

    test('Verify Message Sending and Receiving', async ({ page }) => {
        // Navigate to the messages page
        await page.getByRole('link', { name: 'Messages' }).click();

        // Ensure test waits for the page elements to load
        // TODO - Find a way to do this without a hardcoded time gate
        await page.waitForTimeout(5000);

        // Count current number of messages
        const rows = page.locator('.col-sm-2');
        const rowCount = await rows.count();

        // Navigate to the homepage
        await page.getByRole('link', { name: 'Restful Booker Platform Demo' }).click();

        // Navigate to the contact section
        await page.locator('#navbarNav').getByRole('link', { name: 'Contact' }).click();

        // Fill out and submit a message
        await page.getByTestId('ContactName').fill('Test Tester');
        await page.getByTestId('ContactEmail').fill('testtester@test.com');
        await page.getByTestId('ContactPhone').fill('12345678901');
        await page.getByTestId('ContactSubject').fill('Testing');
        await page.getByTestId('ContactDescription').fill('This is a testing message. Please read this message. Please log this message correctly.');
        await page.getByRole('button', { name: 'Submit' }).click();

        // Verify that confirmation message appears
        await expect(page.getByRole('heading', { name: 'Thanks for getting in touch' })).toBeVisible();
        await expect(page.getByText('We\'ll get back to you about')).toBeVisible();
        await expect(page.getByText('Testing')).toBeVisible();
        await expect(page.getByText('as soon as possible.')).toBeVisible();

        // Navigate to the messages tab of the admin page
        await page.getByRole('link', { name: 'Admin', exact: true }).click();
        await page.getByRole('link', { name: 'Messages' }).click();

        // Ensure test waits for the page elements to load
        // TODO - Find a way to do this without a hardcoded time gate
        await page.waitForTimeout(5000);

        // Verify that the number of messages has increased by one
        const newRows = page.locator('.col-sm-2');
        const newRowCount = await newRows.count();

        await expect(rowCount).toEqual(newRowCount - 1);

        // Verify content of new message
        await page.getByText('Test Tester').click();
        await expect(page.getByText('From: Test Tester')).toBeVisible();
        await expect(page.getByText('Phone: 12345678901')).toBeVisible();
        await expect(page.getByText('Email: testtester@test.com')).toBeVisible();
        await expect(page.getByTestId('message').getByText('Testing', { exact: true })).toBeVisible();
        await expect(page.getByText('This is a testing message. Please read this message. Please log this message correctly.')).toBeVisible();
        await page.getByRole('button', { name: 'Close' }).click();
    })    

    test('Invalid Contact Details', async ({ page }) => {
        // Placeholder for tests that should be added when time allows
    })

    test('Admin Can Delete Messages', async ({ page }) => {
        // Placeholder for tests that should be added when time allows
    })

});