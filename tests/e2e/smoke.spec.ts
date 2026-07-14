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

test("keeps the header accent visible while scrolling", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, 900));

  const header = page.locator(".site-header");
  const box = await header.boundingBox();
  const accent = await header.evaluate((element) => {
    const styles = window.getComputedStyle(element, "::after");
    return {
      backgroundColor: styles.backgroundColor,
      content: styles.content,
      height: parseFloat(styles.height),
      width: parseFloat(styles.width),
    };
  });

  expect(box?.y).toBe(0);
  expect(accent.content).not.toBe("none");
  expect(accent.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  expect(accent.height).toBeGreaterThan(0);
  expect(accent.width).toBeGreaterThan(0);
});

test("contains project media and copy before the next section", async ({
  page,
}) => {
  await page.goto("/");

  const geometry = await page.evaluate(() => {
    const selectedWork = document.querySelector("#selected-work");
    const nextSection = selectedWork?.nextElementSibling;
    const cards = [...document.querySelectorAll(".project-card")];
    const bodyBottoms = cards.map(
      (card) =>
        card.querySelector(".card-body")?.getBoundingClientRect().bottom ?? 0,
    );

    return {
      bodyBottoms,
      mediaDisplays: cards.map(
        (card) =>
          window.getComputedStyle(card.querySelector(".card-media") as Element)
            .display,
      ),
      nextSectionTop: nextSection?.getBoundingClientRect().top ?? 0,
    };
  });

  expect(geometry.mediaDisplays.every((display) => display === "block")).toBe(
    true,
  );
  expect(Math.max(...geometry.bodyBottoms)).toBeLessThan(
    geometry.nextSectionTop,
  );
});

for (const theme of ["minimal", "editorial", "terminal"] as const) {
  test(`renders the John Doe site with the ${theme} theme`, async ({
    page,
  }) => {
    await page.goto(`/themes/${theme}/`);

    await expect(page.locator("html")).toHaveClass(
      new RegExp(`theme-${theme}`),
    );
    await expect(
      page.getByRole("heading", { name: /john doe makes/i }),
    ).toBeVisible();
    await expect(
      page.locator(`.theme-preview-links a[href$="/${theme}/"]`),
    ).toHaveAttribute("aria-current", "page");
  });
}
