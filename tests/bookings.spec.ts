import { test, expect } from '@playwright/test';

test.describe('Booking Scenarios', () => {
    test.beforeEach(async({ page }) => {
        // Visit the homepage prior to the beginning of each test
        await page.goto('https://automationintesting.online/');
    })

    test('Book Single', async ({ page }) => {
        // Select dates and navigate to the booking page
        await page.getByRole('textbox').first().click();
        await page.getByRole('textbox').first().fill('05/11/2026');
        await page.getByRole('textbox').nth(1).click();
        await page.getByRole('textbox').nth(1).fill('08/11/2026');
        await page.getByRole('button', { name: 'Check Availability' }).click();
        await page.getByRole('link', { name: 'Book now' }).nth(1).click();

        // Verify price summary details are correct
        await expect(page.locator('form').getByText('£100 x 3 nights')).toBeVisible();
        await expect(page.locator('form').getByText('£300', { exact: true })).toBeVisible();
        await expect(page.locator('form').getByText('£25', { exact: true })).toBeVisible();
        await expect(page.locator('form').getByText('£15', { exact: true })).toBeVisible();
        await expect(page.locator('form').getByText('£340', { exact: true })).toBeVisible();

        // Select "Reserve Now" and fill out the form with appropriate details
        await page.getByRole('button', { name: 'Reserve Now' }).click();
        await page.getByRole('textbox', { name: 'Firstname' }).fill('Test');
        await page.getByRole('textbox', { name: 'Lastname' }).fill('One');
        await page.getByRole('textbox', { name: 'Email' }).fill('testone@test.com');
        await page.getByRole('textbox', { name: 'Phone' }).fill('12345678901');
        await page.getByRole('button', { name: 'Reserve Now' }).click();

        // Verify dates and booking confirmation
        await expect(page.getByRole('heading', { name: 'Booking Confirmed' })).toBeVisible();
        await expect(page.getByText('-11-05 - 2026-11-08')).toBeVisible();

        // Verify admin message for new booking has been recieved
        await page.getByRole('link', { name: 'Admin', exact: true }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('admin');
        await page.getByRole('textbox', { name: 'Password' }).fill('password');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('link', { name: 'Messages' }).click();
        await page.getByText('Test One').click();
        await expect(page.getByText('From: Test One')).toBeVisible();
        await expect(page.getByText('Phone: 12345678901')).toBeVisible();
        await expect(page.getByText('Email: testone@test.com')).toBeVisible();
        await expect(page.getByTestId('message').getByText('You have a new booking!')).toBeVisible();
        await expect(page.getByText('You have a new booking from')).toBeVisible();
        await page.getByRole('button', { name: 'Close' }).click();
    });

    test('Book Double', async ({ page }) => {
        // Select dates and navigate to the booking page
        await page.getByRole('textbox').first().click();
        await page.getByRole('textbox').first().fill('05/11/2026');
        await page.getByRole('textbox').nth(1).click();
        await page.getByRole('textbox').nth(1).fill('09/11/2026');
        await page.getByRole('button', { name: 'Check Availability' }).click();
        await page.getByRole('link', { name: 'Book now' }).nth(2).click();

        // Verify price summary details are correct
        await expect(page.locator('form').getByText('£150 x 4 nights')).toBeVisible();
        await expect(page.locator('form').getByText('£600', { exact: true })).toBeVisible();
        await expect(page.locator('form').getByText('£25', { exact: true })).toBeVisible();
        await expect(page.locator('form').getByText('£15', { exact: true })).toBeVisible();
        await expect(page.locator('form').getByText('£640', { exact: true })).toBeVisible();

        // Select "Reserve Now" and fill out the form with appropriate details
        await page.getByRole('button', { name: 'Reserve Now' }).click();
        await page.getByRole('textbox', { name: 'Firstname' }).fill('Test');
        await page.getByRole('textbox', { name: 'Lastname' }).fill('Two');
        await page.getByRole('textbox', { name: 'Email' }).fill('testtwo@test.com');
        await page.getByRole('textbox', { name: 'Phone' }).fill('12345678902');
        await page.getByRole('button', { name: 'Reserve Now' }).click();

        // Verify booking confirmation
        await expect(page.getByRole('heading', { name: 'Booking Confirmed' })).toBeVisible();
        await expect(page.getByText('-11-05 - 2026-11-09')).toBeVisible();

        // Verify admin message for new booking has been recieved
        await page.getByRole('link', { name: 'Admin', exact: true }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('admin');
        await page.getByRole('textbox', { name: 'Password' }).fill('password');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('link', { name: 'Messages' }).click();
        await page.getByText('Test Two').click();
        await expect(page.getByText('From: Test Two')).toBeVisible();
        await expect(page.getByText('Phone: 12345678902')).toBeVisible();
        await expect(page.getByText('Email: testtwo@test.com')).toBeVisible();
        await expect(page.getByTestId('message').getByText('You have a new booking!')).toBeVisible();
        await expect(page.getByText('You have a new booking from')).toBeVisible();
        await page.getByRole('button', { name: 'Close' }).click();
    });

    test('Book Suite', async ({ page }) => {
        // Select dates and navigate to the booking page
        await page.getByRole('textbox').first().click();
        await page.getByRole('textbox').first().fill('05/11/2026');
        await page.getByRole('textbox').nth(1).click();
        await page.getByRole('textbox').nth(1).fill('10/11/2026');
        await page.getByRole('button', { name: 'Check Availability' }).click();
        await page.getByRole('link', { name: 'Book now' }).nth(3).click();

        // Verify price summary details are correct
        await expect(page.locator('form').getByText('£225 x 5 nights')).toBeVisible();
        await expect(page.locator('form').getByText('£1125', { exact: true })).toBeVisible();
        await expect(page.locator('form').getByText('£25', { exact: true })).toBeVisible();
        await expect(page.locator('form').getByText('£15', { exact: true })).toBeVisible();
        await expect(page.locator('form').getByText('£1165', { exact: true })).toBeVisible();

        // Select "Reserve Now" and fill out the form with appropriate details
        await page.getByRole('button', { name: 'Reserve Now' }).click();
        await page.getByRole('textbox', { name: 'Firstname' }).fill('Test');
        await page.getByRole('textbox', { name: 'Lastname' }).fill('Three');
        await page.getByRole('textbox', { name: 'Email' }).fill('testthree@test.com');
        await page.getByRole('textbox', { name: 'Phone' }).fill('12345678903');
        await page.getByRole('button', { name: 'Reserve Now' }).click();

        // Verify booking confirmation
        await expect(page.getByRole('heading', { name: 'Booking Confirmed' })).toBeVisible();
        await expect(page.getByText('-11-05 - 2026-11-10')).toBeVisible();

        // Verify admin message for new booking has been recieved
        await page.getByRole('link', { name: 'Admin', exact: true }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('admin');
        await page.getByRole('textbox', { name: 'Password' }).fill('password');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('link', { name: 'Messages' }).click();
        await page.getByText('Test Three').click();
        await expect(page.getByText('From: Test Three')).toBeVisible();
        await expect(page.getByText('Phone: 12345678903')).toBeVisible();
        await expect(page.getByText('Email: testthree@test.com')).toBeVisible();
        await expect(page.getByTestId('message').getByText('You have a new booking!')).toBeVisible();
        await expect(page.getByText('You have a new booking from')).toBeVisible();
        await page.getByRole('button', { name: 'Close' }).click();
    });    

    test('Add and Book New Room', async ({ page }) => {
        // Login as admin
        await page.goto('https://automationintesting.online/admin');
        await page.getByRole('textbox', { name: 'Username' }).fill('admin');
        await page.getByRole('textbox', { name: 'Password' }).fill('password');
        await page.getByRole('button', { name: 'Login' }).click();

        // Add new room
        await page.getByTestId('roomName').fill('104');
        await page.locator('#type').selectOption('Family');
        await page.locator('#accessible').selectOption('true');
        await page.locator('#roomPrice').fill('400');
        await page.getByRole('checkbox', { name: 'WiFi' }).check();
        await page.getByRole('checkbox', { name: 'Refreshments' }).check();
        await page.getByRole('checkbox', { name: 'TV' }).check();
        await page.getByRole('checkbox', { name: 'Safe' }).check();
        await page.getByRole('checkbox', { name: 'Radio' }).check();
        await page.getByRole('checkbox', { name: 'Views' }).check();
        await page.getByRole('button', { name: 'Create' }).click();

        // Verify that the room has been added in a new row
        await expect(page.locator('div').filter({ hasText: /^104$/ })).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^Family$/ })).toBeVisible();
        await expect(page.locator('#room4 div').filter({ hasText: /^true$/ })).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^400$/ })).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^WiFi, TV, Radio, Refreshments, Safe, Views$/ })).toBeVisible();

        // Navigate to homepage
        await page.goto('https://automationintesting.online/');

        // Select dates and navigate to the booking page for a single room
        // TODO - Once issue has been fixed with newly added rooms not being presented on the homepage, the steps here can be shortened
        await page.getByRole('textbox').first().fill('05/11/2026');
        await page.getByRole('textbox').nth(1).fill('08/11/2026');
        await page.getByRole('button', { name: 'Check Availability' }).click();
        await page.getByRole('link', { name: 'Book now' }).nth(1).click();
        
        // Navigate to the new room's page
        await page.getByRole('link', { name: 'View Details' }).nth(2).click();

        // Verify that the booking page has been correctly set up
        await expect(page.getByText('£400per night')).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^WiFi$/ }).nth(1)).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^TV$/ }).nth(1)).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^Radio$/ }).nth(1)).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^Refreshments$/ }).nth(1)).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^Safe$/ }).nth(1)).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^Views$/ }).nth(1)).toBeVisible();
        
        // Verify price summary details are correct
        await expect(page.locator('form').getByText('£400 x 3 nights')).toBeVisible();
        await expect(page.locator('form').getByText('£1200', { exact: true })).toBeVisible();
        await expect(page.locator('form').getByText('£25', { exact: true })).toBeVisible();
        await expect(page.locator('form').getByText('£15', { exact: true })).toBeVisible();
        await expect(page.locator('form').getByText('£1240', { exact: true })).toBeVisible();

        // Select "Reserve Now" and fill out the form with appropriate details
        await page.getByRole('button', { name: 'Reserve Now' }).click();
        await page.getByRole('textbox', { name: 'Firstname' }).fill('Test');
        await page.getByRole('textbox', { name: 'Lastname' }).fill('Four');
        await page.getByRole('textbox', { name: 'Email' }).fill('testfour@test.com');
        await page.getByRole('textbox', { name: 'Phone' }).fill('12345678904');
        await page.getByRole('button', { name: 'Reserve Now' }).click();

        // Verify booking confirmation
        await expect(page.getByRole('heading', { name: 'Booking Confirmed' })).toBeVisible();
        await expect(page.getByText('-11-05 - 2026-11-08')).toBeVisible();

        // Verify admin message for new booking has been recieved
        await page.getByRole('link', { name: 'Admin', exact: true }).click();
        await page.getByRole('link', { name: 'Messages' }).click();
        await page.getByText('Test Four').click();
        await expect(page.getByText('From: Test Four')).toBeVisible();
        await expect(page.getByText('Phone: 12345678904')).toBeVisible();
        await expect(page.getByText('Email: testfour@test.com')).toBeVisible();
        await expect(page.getByTestId('message').getByText('You have a new booking!')).toBeVisible();
        await expect(page.getByText('You have a new booking from')).toBeVisible();
        await page.getByRole('button', { name: 'Close' }).click();
    })

    test('Invalid Details', async ({ page }) => {
        // Select dates and navigate to the booking page
        await page.getByRole('textbox').first().click();
        await page.getByRole('textbox').first().fill('05/11/2026');
        await page.getByRole('textbox').nth(1).click();
        await page.getByRole('textbox').nth(1).fill('08/11/2026');
        await page.getByRole('button', { name: 'Check Availability' }).click();
        await page.getByRole('link', { name: 'Book now' }).nth(1).click();

        // Select "Reserve Now" and fill out the form with invalid details
        await page.getByRole('button', { name: 'Reserve Now' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('test');
        await page.getByRole('textbox', { name: 'Phone' }).fill('1');
        await page.getByRole('button', { name: 'Reserve Now' }).click();

        // Verify invalid details messages
        await expect(page.getByText('size must be between 3 and 18')).toBeVisible();
        await expect(page.getByText('must be a well-formed email')).toBeVisible();
        await expect(page.getByText('Firstname should not be blank')).toBeVisible();
        await expect(page.getByText('size must be between 11 and')).toBeVisible();
        await expect(page.getByText('Lastname should not be blank')).toBeVisible();
        await expect(page.getByText('size must be between 3 and 30')).toBeVisible();

        // Fill out the form with some valid details to ensure the right messages disappear
        await page.getByRole('textbox', { name: 'Firstname' }).click();
        await page.getByRole('textbox', { name: 'Firstname' }).fill('Test');
        await page.getByRole('textbox', { name: 'Lastname' }).fill('Test');
        await page.getByRole('button', { name: 'Reserve Now' }).click();

        // Verify invalid details messages change
        await expect(page.getByText('must be a well-formed email')).toBeVisible();
        await expect(page.getByText('size must be between 11 and')).toBeVisible();

        // Fill out the form with more inappropriate details
        await page.getByRole('textbox', { name: 'Email' }).fill('test@test');
        await page.getByRole('textbox', { name: 'Phone' }).fill('abcdefghijk');
        await page.getByRole('button', { name: 'Reserve Now' }).click();

        // Verify invalid details messages change
        // TODO - The "numbers only" message does not currently exist, and should be updated when a message has been added
        await expect(page.getByText('must be a well-formed email')).toBeVisible();
        // await expect(page.getByText('numbers only')).toBeVisible();
    });
});