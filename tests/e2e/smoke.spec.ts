import { expect, test } from "@playwright/test";

test("renders the homepage and primary navigation", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /john doe makes/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Writing", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Atlas Public Works" }),
  ).toBeVisible();
});

test("excludes draft and scheduled posts from the blog index", async ({
  page,
}) => {
  await page.goto("/blog/");
  await expect(
    page.getByRole("heading", { name: "Designing for the last ten percent" }),
  ).toBeVisible();
  await expect(page.getByText("Future Roadmap")).toHaveCount(0);
  await expect(page.getByText("Draft Note")).toHaveCount(0);
});
