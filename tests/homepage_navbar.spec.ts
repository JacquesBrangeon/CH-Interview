import { test, expect } from '@playwright/test';

test.describe('Homepage Navbar Scenarios', () => {
    test.beforeEach(async({ page }) => {
        // Visit the homepage prior to the beginning of each test
        await page.goto('https://automationintesting.online/');
    })

    test('Navbar Homepage Link', async ({ page }) => {
        // Following "Shady Meadows B&B" link navigates user to the homepage
        await page.getByRole('link', { name: 'Shady Meadows B&B' }).click();

        // Verify that the link has navigated to the correct url
        await expect(page).toHaveURL('https://automationintesting.online/')

        // Ensure the "Welcome" heading is visible on the page
        await expect(page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B' })).toBeVisible;
    });

    test('Navbar Rooms Link', async ({ page }) => {
        // Following "Rooms" link navigates user to the correct part of the page
        await page.locator('#navbarNav').getByRole('link', { name: 'Rooms' }).click();

        // Verify that the link has navigated to the correct url
        await expect(page).toHaveURL('https://automationintesting.online/#rooms')

        // Ensure the "Our Rooms" heading is visible on the page
        await expect(page.getByRole('heading', { name: 'Our Rooms' })).toBeVisible;
    });

    test('Navbar Booking Link', async ({ page }) => {
        // Following "Booking" link navigates user to the correct part of the page
        await page.locator('#navbarNav').getByRole('link', { name: 'Booking' }).click();

        // Verify that the link has navigated to the correct url
        await expect(page).toHaveURL('https://automationintesting.online/#booking')

        // Ensure X is visible on the page
        // TODO - Expected action uncertain, discuss with devs and BA
    });

    test('Navbar Amenities Link', async ({ page }) => {
        // Following "Amenities" link navigates user to the correct part of the page
        await page.locator('#navbarNav').getByRole('link', { name: 'Amenities' }).click();

        // Verify that the link has navigated to the correct url
        await expect(page).toHaveURL('https://automationintesting.online/#amenities')

        // Ensure X is visible on the page
        // TODO - Expected action uncertain, discuss with devs and BA
    });

    test('Navbar Location Link', async ({ page }) => {
        // Following "Location" link navigates user to the correct part of the page
        await page.locator('#navbarNav').getByRole('link', { name: 'Location' }).click();

        // Verify that the link has navigated to the correct url
        await expect(page).toHaveURL('https://automationintesting.online/#location')

        // Ensure the "Our Location" heading is visible on the page
        await expect(page.getByRole('heading', { name: 'Our Location' })).toBeVisible;
    });

    test('Navbar Contact Link', async ({ page }) => {
        // Following "Contact" link navigates user to the correct part of the page
        await page.locator('#navbarNav').getByRole('link', { name: 'Contact' }).click();

        // Verify that the link has navigated to the correct url
        await expect(page).toHaveURL('https://automationintesting.online/#contact')

        // Ensure the "Send Us a Message" heading is visible on the page
        await expect(page.getByRole('heading', { name: 'Send Us a Message' })).toBeVisible;
    });

    test('Navbar Admin Link', async ({ page }) => {
        // Following "Admin" link navigates user to the correct part of the page
        await page.locator('#navbarNav').getByRole('link', { name: 'Admin' }).click();

        // Verify that the link has navigated to the correct url
        await expect(page).toHaveURL('https://automationintesting.online/admin')

        // Ensure the "Login" heading is visible on the page
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible;
    });
});