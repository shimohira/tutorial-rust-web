import { expect, test } from "@playwright/test";

test("setup module exposes multiple submodules and each lab can run", async ({ page }) => {
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
      name: /Setup, Cargo, dan cara kerja project Rust/i,
    }),
  ).toBeVisible();

  const firstSubmodule = page.getByTestId("submodule-setup-environment");
  const secondSubmodule = page.getByTestId("submodule-setup-cargo-cycle");

  await expect(firstSubmodule).toBeVisible();
  await expect(secondSubmodule).toBeVisible();

  await firstSubmodule.getByTestId("rust-editor").fill(`fn main() {
    println!("Toolchain siap");
}`);
  await firstSubmodule.getByTestId("run-code").click();

  await expect(firstSubmodule.getByText("Latihan selesai")).toBeVisible({
    timeout: 60_000,
  });
  await expect(firstSubmodule.getByTestId("terminal-output")).toContainText("Toolchain siap");

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
});
