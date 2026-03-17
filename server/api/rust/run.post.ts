import { execFile as execFileCallback } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const execFile = promisify(execFileCallback);

export default defineEventHandler(async (event) => {
  const body = await readBody<{ code?: string }>(event);
  const code = body.code;

  if (typeof code !== "string" || code.trim().length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Kode Rust tidak boleh kosong.",
    });
  }

  if (code.length > 20_000) {
    throw createError({
      statusCode: 400,
      statusMessage: "Kode terlalu panjang untuk runner ini.",
    });
  }

  const workingDirectory = await mkdtemp(join(tmpdir(), "nuxt-rust-lab-"));
  const sourceFile = join(workingDirectory, "main.rs");
  const binaryFile = join(workingDirectory, "main");

  try {
    await writeFile(sourceFile, code, "utf8");

    try {
      await execFile(
        "rustc",
        ["--edition", "2024", sourceFile, "-o", binaryFile],
        {
          cwd: workingDirectory,
          timeout: 10_000,
          maxBuffer: 1_024 * 1_024,
        },
      );
    } catch (error) {
      const compileError = error as {
        stdout?: string | Buffer;
        stderr?: string | Buffer;
        message?: string;
      };

      return {
        ok: false,
        stage: "compile",
        status: "compile_error",
        stdout: String(compileError.stdout ?? ""),
        stderr: String(compileError.stderr ?? compileError.message ?? ""),
      };
    }

    try {
      const { stdout, stderr } = await execFile(binaryFile, [], {
        cwd: workingDirectory,
        timeout: 5_000,
        maxBuffer: 1_024 * 1_024,
        env: {
          PATH: process.env.PATH ?? "",
          HOME: process.env.HOME ?? "",
          LANG: "C.UTF-8",
        },
      });

      return {
        ok: true,
        stage: "run",
        status: "success",
        stdout: String(stdout),
        stderr: String(stderr),
      };
    } catch (error) {
      const runtimeError = error as {
        stdout?: string | Buffer;
        stderr?: string | Buffer;
        message?: string;
      };

      return {
        ok: false,
        stage: "run",
        status: "runtime_error",
        stdout: String(runtimeError.stdout ?? ""),
        stderr: String(runtimeError.stderr ?? runtimeError.message ?? ""),
      };
    }
  } finally {
    await rm(workingDirectory, { recursive: true, force: true });
  }
});
