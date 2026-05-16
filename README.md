# QA Automation Suite

[![Playwright Tests](https://github.com/GreSastre/qa-automation-suite/actions/workflows/playwright.yml/badge.svg)](https://github.com/GreSastre/qa-automation-suite/actions/workflows/playwright.yml)
End-to-end and API test automation framework built with Playwright and TypeScript.

## About

Automated testing framework for web applications using **Playwright** and **TypeScript**.
Implements Page Object Model pattern, API testing, mixed UI+API tests, and CI/CD integration with GitHub Actions.

### Key Features

- End-to-end UI tests across Chromium, Firefox and WebKit
- REST API testing with full CRUD coverage
- Mixed UI + API test patterns
- External test data management with JSON
- Environment variables for secure credential handling
- Allure Reports integration

## Tech Stack

- Playwright
- TypeScript
- GitHub Actions CI/CD
- Page Object Model pattern

## Test Stats

- 75 test cases passing across 3 browsers
- Full CRUD API test coverage
- Mixed UI + API test patterns
- CI/CD with GitHub Actions on every push
- Allure Reports integration

## Project Structure

    qa-automation-suite/
    ├── pages/
    ├── tests/
    │   ├── ui/
    │   └── api/
    └── playwright.config.ts

## Test Coverage

### UI Tests — Saucedemo

- Login successful, failed, locked user, empty fields
- Product filtering
- Add to cart and checkout flow
- Logout

### API Tests — Reqres

- GET users list
- GET single user
- GET non-existent user 404
- POST create user
- PUT update user
- DELETE user

## How to Run

Install dependencies

    npm install
    npx playwright install

Run all tests

    npx playwright test

Run only UI tests

    npx playwright test tests/ui

Run only API tests

    npx playwright test tests/api

## Test Reports

![Allure Report](screenshots/allure-report.png)
