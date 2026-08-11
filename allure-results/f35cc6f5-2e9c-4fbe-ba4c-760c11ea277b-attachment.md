# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\iframe.spec.ts >> uploadfile
- Location: tests\ui\iframe.spec.ts:2:5

# Error details

```
Error: locator.fill: Error: Element is not an <input>, <textarea>, <select> or [contenteditable] and does not have a role allowing [aria-readonly]
Call log:
  - waiting for locator('#mce_0_ifr').contentFrame().locator('body')
    - locator resolved to <body id="tinymce" data-id="mce_0" spellcheck="false" class="mce-content-body " aria-label="Rich Text Area. Press ALT-0 for help.">…</body>
    - fill("Mi texto de prueba")
  - attempting fill action
    - waiting for element to be visible, enabled and editable

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e4]:
    - link "Fork me on GitHub":
      - /url: https://github.com/tourdedave/the-internet
      - img "Fork me on GitHub" [ref=e5] [cursor=pointer]
    - generic [ref=e7]:
      - heading "An iFrame containing the TinyMCE WYSIWYG Editor" [level=3] [ref=e8]
      - application [ref=e9]:
        - generic [ref=e10]:
          - generic [ref=e11]:
            - menubar [ref=e12]:
              - menuitem "File" [disabled] [ref=e13]:
                - generic [ref=e14]: File
              - menuitem "Edit" [disabled] [ref=e15]:
                - generic [ref=e16]: Edit
              - menuitem "View" [disabled] [ref=e17]:
                - generic [ref=e18]: View
              - menuitem "Format" [disabled] [ref=e19]:
                - generic [ref=e20]: Format
            - group [ref=e21]:
              - group [ref=e22]:
                - toolbar "history" [ref=e23]:
                  - button "Undo" [disabled] [ref=e24]:
                    - img [ref=e26]
                  - button "Redo" [disabled] [ref=e28]:
                    - img [ref=e30]
                - toolbar "styles" [ref=e32]:
                  - button "Formats" [disabled] [ref=e33]:
                    - generic [ref=e34]: Paragraph
                    - img [ref=e36]
                - toolbar "formatting" [ref=e38]:
                  - button "Bold" [disabled] [ref=e39]:
                    - img [ref=e41]
                  - button "Italic" [disabled] [ref=e43]:
                    - img [ref=e45]
                - toolbar "alignment" [ref=e47]:
                  - button "Align left" [disabled] [ref=e48]:
                    - img [ref=e50]
                  - button "Align center" [disabled] [ref=e52]:
                    - img [ref=e54]
                  - button "Align right" [disabled] [ref=e56]:
                    - img [ref=e58]
                  - button "Justify" [disabled] [ref=e60]:
                    - img [ref=e62]
                - toolbar "indentation" [ref=e64]:
                  - button "Decrease indent" [disabled] [ref=e65]:
                    - img [ref=e67]
                  - button "Increase indent" [disabled] [ref=e69]:
                    - img [ref=e71]
          - generic [ref=e73]:
            - iframe [ref=e75]:
              - generic "Rich Text Area. Press ALT-0 for help." [active] [ref=f1e1]
            - complementary
        - generic [ref=e76]:
          - generic [ref=e77]:
            - navigation [ref=e78]
            - link "Powered by Tiny" [ref=e80]:
              - /url: https://www.tiny.cloud/?utm_campaign=editor_referral&utm_medium=poweredby&utm_source=tinymce&utm_content=v5
          - generic "Resize" [ref=e81]:
            - img [ref=e82]
  - generic [ref=e86]:
    - separator [ref=e87]
    - generic [ref=e88]:
      - text: Powered by
      - link "Elemental Selenium" [ref=e89] [cursor=pointer]:
        - /url: http://elementalselenium.com/
```

# Test source

```ts
  1 | import { test, expect } from "@playwright/test";
  2 | test("uploadfile", async ({ page }) => {
  3 |   await page.goto("https://the-internet.herokuapp.com/iframe");
  4 |   const frame = page.frameLocator("#mce_0_ifr");
> 5 |   await frame.locator("body").fill("Mi texto de prueba");
    |                               ^ Error: locator.fill: Error: Element is not an <input>, <textarea>, <select> or [contenteditable] and does not have a role allowing [aria-readonly]
  6 |   expect(frame.locator("body")).toHaveText("Mi texto de prueba");
  7 | });
  8 | 
```