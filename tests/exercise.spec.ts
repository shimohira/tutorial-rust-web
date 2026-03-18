import { expect, test } from "@playwright/test";

test("setup module can expose more than two submodules and each lab can run", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /Belajar Rust per modul/i,
    }),
  ).toBeVisible();

  await page.getByRole("link", {
    name: /Setup, Cargo, dan cara kerja project Rust/i,
  }).click();

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Setup, Cargo, dan cara kerja project Rust/i,
    }),
  ).toBeVisible();

  const firstSubmodule = page.getByTestId("submodule-setup-environment");
  const secondSubmodule = page.getByTestId("submodule-setup-cargo-cycle");
  const thirdSubmodule = page.getByTestId("submodule-setup-project-map");

  await expect(firstSubmodule).toBeVisible();
  await expect(secondSubmodule).toBeVisible();
  await expect(thirdSubmodule).toBeVisible();

  await firstSubmodule.getByTestId("rust-editor").fill(`fn main() {
    println!("Toolchain siap");
}`);
  await firstSubmodule.getByTestId("run-code").click();

  await expect(firstSubmodule.getByText("Latihan selesai")).toBeVisible({
    timeout: 60_000,
  });
  await expect(firstSubmodule.getByTestId("terminal-output")).toContainText("Toolchain siap");
  await expect(page.getByTestId("module-progress-summary")).toHaveText("1 / 3 submodule selesai");
  await expect(firstSubmodule.getByTestId("submodule-progress-setup-environment")).toHaveText(
    "Selesai",
  );

  await secondSubmodule.getByTestId("rust-editor").fill(`fn crate_name() -> &'static str {
    "belajar-rust"
}

fn main() {
    println!("crate: {}", crate_name());
}`);
  await secondSubmodule.getByTestId("run-code").click();

  await expect(secondSubmodule.getByText("Latihan selesai")).toBeVisible({
    timeout: 60_000,
  });
  await expect(secondSubmodule.getByTestId("terminal-output")).toContainText("crate: belajar-rust");
  await expect(page.getByTestId("module-progress-summary")).toHaveText("2 / 3 submodule selesai");

  await thirdSubmodule.getByTestId("rust-editor").fill(`fn project_layout() -> &'static str {
    "Cargo.toml + src/main.rs"
}

fn main() {
    assert_eq!("Cargo.toml + src/main.rs", project_layout());
    println!("layout siap");
}`);
  await thirdSubmodule.getByTestId("run-code").click();

  await expect(thirdSubmodule.getByText("Latihan selesai")).toBeVisible({
    timeout: 60_000,
  });
  await expect(thirdSubmodule.getByTestId("terminal-output")).toContainText("layout siap");
  await expect(page.getByTestId("module-progress-summary")).toHaveText("3 / 3 submodule selesai");

  await page.reload();

  await expect(page.getByTestId("module-progress-summary")).toHaveText("3 / 3 submodule selesai");
  await expect(page.getByTestId("module-progress-labs")).toHaveText("3 / 3 latihan");

  await page.goto("/");
  await expect(page.getByTestId("module-progress-setup")).toContainText("3 / 3 submodule selesai");
  await expect(page.getByTestId("module-progress-setup")).toContainText("3 / 3 lab selesai");
});

test("sidebar module menu stays usable on narrow screens", async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 900 });
  await page.goto("/modules/setup");

  const moduleSidebarNav = page.getByTestId("module-sidebar-nav");

  await moduleSidebarNav
    .getByRole("link", {
      name: /Result, lifetime, derive, smart pointer, static, macro/i,
    })
    .click();

  await expect(page).toHaveURL(/\/modules\/advanced$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Result, lifetime, derive, smart pointer, static, macro/i,
    }),
  ).toBeVisible();

  await expect(page.getByTestId("submodule-sidebar-nav")).toBeVisible();
});

test("sticky navigation can expand after scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/modules/setup");

  await page.evaluate(() => {
    window.scrollTo(0, 1800);
  });

  const navigationShell = page.getByTestId("module-navigation-shell");
  await expect(navigationShell).toHaveClass(/is-stuck/);

  const moduleToggle = page.getByTestId("module-nav-toggle");
  await expect(moduleToggle).toBeVisible();
  await moduleToggle.click();

  const moduleNav = page.getByTestId("module-sidebar-nav");
  await expect(moduleNav).toBeVisible();
  await expect
    .poll(async () => {
      return moduleNav.evaluate((element) => {
        const shell = element.closest("[data-testid='module-navigation-shell']");

        if (!(shell instanceof HTMLElement)) {
          return false;
        }

        return element.clientWidth >= shell.clientWidth * 0.85 && element.scrollWidth > element.clientWidth;
      });
    })
    .toBe(true);

  await moduleNav
    .getByRole("link", {
      name: /Result, lifetime, derive, smart pointer, static, macro/i,
    })
    .click();

  await expect(page).toHaveURL(/\/modules\/advanced$/);
});

test("related modules expose official Rust docs links", async ({ page }) => {
  await page.goto("/modules/control-flow");

  const rangeDocsUrl = "https://doc.rust-lang.org/std/ops/index.html#structs";
  const moduleDocs = page.getByTestId("module-doc-links");
  const loopDocs = page.getByTestId("submodule-doc-links-control-flow-loops");

  await expect(moduleDocs).toBeVisible();
  await expect(moduleDocs.locator(`a[href="${rangeDocsUrl}"]`)).toBeVisible();

  await expect(loopDocs).toBeVisible();
  await expect(loopDocs.locator(`a[href="${rangeDocsUrl}"]`)).toBeVisible();
});

test("collections are split into sequence maps and sets submodules", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", {
    name: /Sequence, Maps, Sets, dan collection standar/i,
  }).click();

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Sequence, Maps, Sets, dan collection standar/i,
    }),
  ).toBeVisible();

  await expect(page.getByTestId("submodule-collections-sequence")).toBeVisible();
  await expect(page.getByTestId("submodule-collections-maps")).toBeVisible();
  await expect(page.getByTestId("submodule-collections-sets")).toBeVisible();
});

test("smart pointers submodule shows detailed usage examples", async ({ page }) => {
  await page.goto("/modules/advanced");

  const smartPointerUsage = page.getByTestId("submodule-usage-advanced-smart-pointers");

  await expect(smartPointerUsage).toBeVisible();
  await expect(
    smartPointerUsage.getByRole("heading", {
      level: 4,
      name: "Tanpa Box vs dengan Box pada recursive type",
    }),
  ).toBeVisible();
  await expect(
    smartPointerUsage.getByRole("heading", {
      level: 4,
      name: "Box membungkus struct konfigurasi besar",
    }),
  ).toBeVisible();
  await expect(
    smartPointerUsage.getByRole("heading", {
      level: 4,
      name: "Implementasi Deref pada struct pembungkus",
    }),
  ).toBeVisible();
  await expect(
    smartPointerUsage.getByRole("heading", {
      level: 4,
      name: "Box untuk trait object runtime",
    }),
  ).toBeVisible();

  const comparison = page.getByTestId("submodule-usage-comparison-advanced-smart-pointers-0");
  await expect(comparison).toBeVisible();
  await expect(comparison.getByText("Tanpa Box")).toBeVisible();
  await expect(comparison.getByText("Dengan Box")).toBeVisible();
});

test("comparison usage examples appear on other concept-heavy submodules", async ({ page }) => {
  await page.goto("/modules/ownership");

  const borrowingComparison = page.getByTestId("submodule-usage-comparison-ownership-borrowing-1");
  await expect(borrowingComparison).toBeVisible();
  await expect(borrowingComparison.getByText("Tanpa borrow")).toBeVisible();
  await expect(borrowingComparison.getByText("Dengan borrow")).toBeVisible();

  await page.goto("/modules/stdlib");

  const optionComparison = page.getByTestId("submodule-usage-comparison-stdlib-option-1");
  await expect(optionComparison).toBeVisible();
  await expect(optionComparison.getByText("Dengan sentinel kosong")).toBeVisible();
  await expect(optionComparison.getByText("Dengan Option")).toBeVisible();

  await page.goto("/modules/abstraction");

  const traitComparison = page.getByTestId("submodule-usage-comparison-abstraction-traits-1");
  await expect(traitComparison).toBeVisible();
  await expect(traitComparison.getByText("Tanpa trait")).toBeVisible();
  await expect(traitComparison.getByText("Dengan trait")).toBeVisible();
});
