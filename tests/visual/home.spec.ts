import { expect, test } from "@playwright/test";

test("homepage visual baseline", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot("home.png", { fullPage: true });
});
