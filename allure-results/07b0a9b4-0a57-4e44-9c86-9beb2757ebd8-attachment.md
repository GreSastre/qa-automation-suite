# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\iframe.spec.ts >> uploadfile
- Location: tests\ui\iframe.spec.ts:2:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#mce_0_ifr').contentFrame().locator('body')
Expected: "Mi texto de prueba"
Received: "Your content goes here."

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('#mce_0_ifr').contentFrame().locator('body')
    8 × locator resolved to <body id="tinymce" data-id="mce_0" spellcheck="false" contenteditable="false" class="mce-content-body mce-content-readonly" aria-label="Rich Text Area. Press ALT-0 for help.">…</body>
      - unexpected value "Your content goes here."

```

# Test source

```ts
  1 | import { test, expect } from "@playwright/test";
  2 | test("uploadfile", async ({ page }) => {
  3 |   await page.goto("https://the-internet.herokuapp.com/iframe");
  4 |   const frame = page.frameLocator("#mce_0_ifr");
  5 |   await frame.locator("body").click();
  6 |   await frame.locator("body").pressSequentially("Mi texto de prueba");
> 7 |   await expect(frame.locator("body")).toHaveText("Mi texto de prueba");
    |                                       ^ Error: expect(locator).toHaveText(expected) failed
  8 | });
  9 | 
```