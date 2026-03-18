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
