import { test, expect } from '@playwright/test';

test.describe('Homepage Navbar Scenarios', () => {
    test.beforeEach(async({ page }) => {
        // Login as an admin prior to the beginning of each test
        await page.goto('https://automationintesting.online/admin');
        await page.getByRole('textbox', { name: 'Username' }).fill('admin');
        await page.getByRole('textbox', { name: 'Password' }).fill('password');
        await page.getByRole('button', { name: 'Login' }).click();
    })

    test('Navbar Homepage Link', async ({ page }) => {
        // Following "Restful Booker Platform Demo" link navigates user to the homepage
        await page.getByRole('link', { name: 'Restful Booker Platform Demo' }).click();

        // Verify that the link has navigated to the correct url
        await expect(page).toHaveURL('https://automationintesting.online/')

        // Ensure the "Welcome" heading is visible on the page
        await expect(page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B' })).toBeVisible;
    });

    test('Navbar Links', async ({ page }) => {
        // Since the Rooms link would just direct to the starting page, we need to navigate away
        // With this in mind, it makes sense to test all of the link sequentially

        // Following "Report" link navigates the user to the report page
        await page.getByRole('link', { name: 'Report' }).click();
        await expect(page).toHaveURL('https://automationintesting.online/admin/report')
        await expect(page.getByRole('button', { name: 'Today' })).toBeVisible();

        // Following "Branding" link navigates the user to the branding page
        await page.getByRole('link', { name: 'Branding' }).click();
        await expect(page).toHaveURL('https://automationintesting.online/admin/branding')
        await expect(page.getByRole('heading', { name: 'B&B details' })).toBeVisible();

        // Following "Messages" link navigates the user to the messages page
        await page.getByRole('link', { name: 'Messages' }).click();
        await expect(page).toHaveURL('https://automationintesting.online/admin/message')
        await expect(page.locator('div').filter({ hasText: /^Subject$/ })).toBeVisible();

        // Following "Rooms" link navigates the user to the rooms page
        await page.getByRole('link', { name: 'Rooms' }).click();
        await expect(page).toHaveURL('https://automationintesting.online/admin/rooms')
        await expect(page.locator('div').filter({ hasText: /^Room #$/ })).toBeVisible();
    });
});