import { test, expect } from '@playwright/test';

const baseURL = 'https://www.saucedemo.com';
const credentials = { username: 'standard_user', password: 'secret_sauce' };
const testData = { firstName: 'Test', lastName: 'User', postalCode: '12345', invalidPostalCode: 'abc' };
const screenshotsPath = 'test-results/screenshots';

const selectors = {
  username: '#user-name',
  password: '#password',
  loginButton: '#login-button',
  inventoryItem: '.inventory_item',
  addBackpack: '[data-test="add-to-cart-sauce-labs-backpack"]',
  addBikeLight: '[data-test="add-to-cart-sauce-labs-bike-light"]',
  cartLink: '.shopping_cart_link',
  cartItem: '.cart_item',
  checkoutButton: '[data-test="checkout"]',
  firstName: '#first-name',
  lastName: '#last-name',
  postalCode: '#postal-code',
  continueButton: '[data-test="continue"]',
  finishButton: '[data-test="finish"]',
  cancelButton: '[data-test="cancel"]',
  summaryInfo: '.summary_info',
  summarySubtotal: '.summary_subtotal_label',
  summaryTax: '.summary_tax_label',
  summaryTotal: '.summary_total_label',
  orderCompleteHeader: '.complete-header',
  orderCompleteText: '.complete-text',
  backHomeButton: '[data-test="back-to-products"]',
  errorMessage: '[data-test="error"]',
};

async function login(page) {
  await page.goto(baseURL);
  await page.fill(selectors.username, credentials.username);
  await page.fill(selectors.password, credentials.password);
  await page.click(selectors.loginButton);
  await expect(page).toHaveURL(/inventory.html/);
}

async function addItemsToCart(page) {
  await page.click(selectors.addBackpack);
  await page.click(selectors.addBikeLight);
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
}

async function openCheckoutInformation(page) {
  await page.click(selectors.cartLink);
  await expect(page).toHaveURL(/cart.html/);
  await expect(page.locator(selectors.checkoutButton)).toBeVisible();
  await page.click(selectors.checkoutButton);
  await expect(page).toHaveURL(/checkout-step-one.html/);
}

async function completeCheckoutInformation(page, firstName = testData.firstName, lastName = testData.lastName, postalCode = testData.postalCode) {
  await page.fill(selectors.firstName, firstName);
  await page.fill(selectors.lastName, lastName);
  await page.fill(selectors.postalCode, postalCode);
  await page.click(selectors.continueButton);
}

async function captureScreenshot(page, name) {
  await page.screenshot({ path: `${screenshotsPath}/${name}.png`, fullPage: true });
}

test.describe('SauceDemo checkout workflow', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Cart Review: verifies added items, details, and cart navigation', async ({ page }) => {
    await addItemsToCart(page);
    await page.click(selectors.cartLink);
    await expect(page).toHaveURL(/cart.html/);

    const cartItems = page.locator(selectors.cartItem);
    await expect(cartItems).toHaveCount(2);
    await expect(cartItems.nth(0).locator('.inventory_item_name')).toContainText('Sauce Labs Backpack');
    await expect(cartItems.nth(1).locator('.inventory_item_name')).toContainText('Sauce Labs Bike Light');
    await expect(cartItems.first().locator('.inventory_item_price')).toBeVisible();
    await expect(cartItems.first().locator('.cart_quantity')).toHaveText('1');
    await expect(page.locator(selectors.checkoutButton)).toBeVisible();
    await expect(page.locator('text=Continue Shopping')).toBeVisible();

    await captureScreenshot(page, 'cart-review');
  });

  test('Checkout Information Entry: validates required fields and successful continue', async ({ page }) => {
    await addItemsToCart(page);
    await openCheckoutInformation(page);
    await page.click(selectors.continueButton);
    await expect(page.locator(selectors.errorMessage)).toHaveText(/First Name is required/);
    await captureScreenshot(page, 'checkout-error-first-name');

    await page.fill(selectors.firstName, testData.firstName);
    await page.click(selectors.continueButton);
    await expect(page.locator(selectors.errorMessage)).toHaveText(/Last Name is required/);
    await captureScreenshot(page, 'checkout-error-last-name');

    await page.fill(selectors.lastName, testData.lastName);
    await page.click(selectors.continueButton);
    await expect(page.locator(selectors.errorMessage)).toHaveText(/Postal Code is required/);
    await captureScreenshot(page, 'checkout-error-postal-code');

    await completeCheckoutInformation(page);
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await captureScreenshot(page, 'checkout-information-complete');
  });

  test('Order Overview: displays summary, payment/shipping, and total details', async ({ page }) => {
    await addItemsToCart(page);
    await openCheckoutInformation(page);
    await completeCheckoutInformation(page);

    await expect(page.locator(selectors.summaryInfo)).toBeVisible();
    await expect(page.locator(selectors.summarySubtotal)).toContainText('Item total');
    await expect(page.locator(selectors.summaryTax)).toContainText('Tax');
    await expect(page.locator(selectors.summaryTotal)).toContainText('Total');
    await expect(page.locator(selectors.cancelButton)).toBeVisible();
    await expect(page.locator(selectors.finishButton)).toBeVisible();

    await captureScreenshot(page, 'order-overview');
  });

  test('Order Completion: completes purchase and confirms the order', async ({ page }) => {
    await addItemsToCart(page);
    await openCheckoutInformation(page);
    await completeCheckoutInformation(page);
    await page.click(selectors.finishButton);

    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.locator(selectors.orderCompleteHeader)).toHaveText('Thank you for your order!');
    await expect(page.locator(selectors.orderCompleteText)).toContainText('Your order has been dispatched');
    await expect(page.locator(selectors.backHomeButton)).toBeVisible();
    await captureScreenshot(page, 'order-completion');

    await page.click(selectors.backHomeButton);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Checkout Error Handling: prevents progression when required fields are missing', async ({ page }) => {
    await addItemsToCart(page);
    await openCheckoutInformation(page);
    await page.fill(selectors.firstName, testData.firstName);
    await page.fill(selectors.lastName, testData.lastName);
    await page.fill(selectors.postalCode, '');
    await page.click(selectors.continueButton);

    await expect(page.locator(selectors.errorMessage)).toHaveText(/Postal Code is required/);
    await captureScreenshot(page, 'checkout-validation-postal-code');
  });

  test('Cancel Checkout: allows returning to inventory and retains cart contents', async ({ page }) => {
    await addItemsToCart(page);
    await openCheckoutInformation(page);
    await completeCheckoutInformation(page);
    await page.click(selectors.cancelButton);

    await expect(page).toHaveURL(/inventory.html/);
    await page.click(selectors.cartLink);
    await expect(page).toHaveURL(/cart.html/);
    await expect(page.locator(selectors.cartItem)).toHaveCount(2);
    await captureScreenshot(page, 'cancel-checkout-return');
  });
});
