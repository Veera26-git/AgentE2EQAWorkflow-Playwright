# SCRUM-101 Checkout Test Report

## Executive Summary
- Total test cases planned: 6 manual scenarios, 18 automated browser executions across Chromium, Firefox, and WebKit.
- Manual test cases executed: 6
- Automated test executions: 18
- Overall status: **PASS**
- No functional defects were encountered during the checkout workflow execution.

## Manual Test Results
### Overview
Manual exploratory testing followed the SauceDemo checkout workflow from login through order completion, covering checkout information entry, order overview validation, cancel flow, and error handling.

### Findings
- The cart review flow correctly displayed selected products, prices, quantities, and navigation buttons.
- Checkout information fields were mandatory; blank submission produced clear error messages.
- The checkout overview displayed order summary details, payment/shipping information, and totals.
- Completing the order navigated to the confirmation page with the expected success messaging.
- Canceling from the overview returned the user to the inventory page and preserved cart contents.

### Observations
- Error messages were specific for each missing field.
- The application behavior matched the acceptance criteria for checkout validation and completion.
- No UI inconsistencies, missing validations, or broken workflows were observed.

### Evidence
Screenshots were captured for key states during execution and saved under `test-results/screenshots/`.
- `cart-review.png`
- `checkout-error-first-name.png`
- `checkout-error-last-name.png`
- `checkout-error-postal-code.png`
- `checkout-information-complete.png`
- `order-overview.png`
- `order-completion.png`
- `checkout-validation-postal-code.png`
- `cancel-checkout-return.png`

## Automated Test Results
### Initial Automation Execution
- Test suite: `tests/saucedemo-checkout/checkout.spec.ts`
- Browsers: Chromium, Firefox, WebKit
- Total automated tests: 18
- Result: **18 passed**

### Test Coverage
Automated tests covered the following workflows:
- Cart review and item detail validation
- Checkout information mandatory field validation
- Order overview verification
- Order completion and confirmation
- Cancel checkout flow
- Required field error conditions

### Healing and Stability
- The test suite was adjusted once to align with SauceDemo’s actual confirmation copy and cancel navigation behavior.
- After adjustment, all tests passed across the three configured browsers.

## Defects Log
No defects were identified during manual exploratory testing or automated execution.

## Test Coverage Analysis
- Acceptance criteria coverage: complete
  - AC1: cart review verified
  - AC2: checkout information entry and validation verified
  - AC3: order overview summary verified
  - AC4: order completion confirmation verified
  - AC5: error handling verified
- Manual vs automated coverage:
  - Manual testing confirmed expected application behavior and validation feedback.
  - Automated testing validated stability across desktop Chromium, Firefox, and WebKit.
- Gaps:
  - Mobile-specific responsiveness was not executed in this workflow but can be added via additional Playwright mobile projects.

## Summary and Recommendations
- The checkout workflow for SauceDemo is stable and satisfies the defined acceptance criteria.
- Recommended next steps:
  1. Add mobile viewport coverage for the checkout flow.
  2. Add data-driven tests for additional product combinations.
  3. Add regression tests for alternate checkout cancel and back-button navigation paths.
