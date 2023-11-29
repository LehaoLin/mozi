#!/usr/bin/env zx

const exists = await fs.pathExists("./frontend");
if (exists) {
  cd("./frontend");
  await $`pnpm i`;
  await $`pnpm build`;
}
