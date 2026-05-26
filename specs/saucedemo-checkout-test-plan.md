# SauceDemo Checkout Test Plan

## Application
- URL: https://www.saucedemo.com
- Test credentials:
  - Username: `standard_user`
  - Password: `secret_sauce`

## Scope
Test the end-to-end checkout workflow from cart review through order confirmation, including form validation, checkout overview, cancel flow, and final purchase completion.

## Acceptance Criteria Covered
- AC1: Cart Review
- AC2: Checkout Information Entry
- AC3: Order Overview
- AC4: Order Completion
- AC5: Error Handling

## Test Scenarios

### Scenario 1: Cart Review and Navigation
**Objective:** Verify cart contents, item details, and navigation options.

**Steps:**
1. Open SauceDemo login page.
2. Log in using valid credentials.
3. Add two products to the cart.
4. Navigate to the cart page.
5. Verify each item name, description, price, and quantity.
6. Confirm the cart shows options to continue shopping and proceed to checkout.

**Expected Results:**
- Cart page displays all selected items with correct details.
- Prices are visible for each item.
- Cart badge count matches selected items.
- Continue Shopping and Checkout buttons are available.

### Scenario 2: Checkout Information Required Fields
**Objective:** Validate mandatory checkout fields and required-field errors.

**Steps:**
1. From the cart page, click `Checkout`.
2. On the checkout information page, leave all fields blank and click `Continue`.
3. Enter only `First Name`, leave `Last Name` and `Postal Code` blank, and click `Continue`.
4. Enter all fields with valid values and click `Continue`.

**Expected Results:**
- Blank submission shows a visible required field error.
- Partial submission indicates the next missing field.
- Valid data proceeds to the overview page.

### Scenario 3: Order Overview Validation
**Objective:** Verify the checkout overview displays order summary, payment, shipping, and totals.

**Steps:**
1. Complete checkout information with valid values.
2. On the overview page, verify item summary and payment/shipping details.
3. Confirm the order displays subtotal, tax, and total.
4. Verify `Cancel` and `Finish` buttons are available.

**Expected Results:**
- Overview page includes all ordered items.
- Payment and shipping sections contain summary values.
- Subtotal, tax, and total appear.
- Cancel and Finish controls are visible.

### Scenario 4: Order Completion
**Objective:** Confirm the purchase flow completes successfully.

**Steps:**
1. From the overview page, click `Finish`.
2. Verify the confirmation page loads.
3. Confirm the success message is displayed.
4. Click `Back Home`.

**Expected Results:**
- Order confirmation page showing a success message.
- `Back Home` returns the user to the product listing.
- The cart is emptied after completion.

### Scenario 5: Checkout Error Handling
**Objective:** Validate checkout form validation and failure prevention.

**Steps:**
1. Open the checkout information page.
2. Enter invalid or incomplete data into the checkout form.
3. Click `Continue`.
4. Observe the validation errors shown.

**Expected Results:**
- The system prevents checkout progression with invalid or empty fields.
- Clear validation messages appear for each missing required field.

### Scenario 6: Cancel Checkout Flow
**Objective:** Verify the user can cancel checkout and return to the cart.

**Steps:**
1. Start checkout from the cart page.
2. Fill in valid checkout information and continue to overview.
3. Click `Cancel` on the overview page.

**Expected Results:**
- Cancel returns the user to the cart page.
- Cart contents remain intact.

## Test Data
- Username: `standard_user`
- Password: `secret_sauce`
- First Name: `Test`
- Last Name: `User`
- Postal Code: `12345`

## Notes
- Use stable selectors such as `data-test` attributes and element IDs.
- Capture screenshots for cart review, validation errors, overview summary, and order confirmation.
- Validate browser compatibility for Chromium, Firefox, and WebKit.
