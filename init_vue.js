#!/usr/bin/env zx

const exists = await fs.pathExists("./frontend");
if (exists) {
  echo("The frontend dir already exists? Please delete it.");
} else {
  await $`npx degit LehaoLin/frontend frontend`;
  cd("./frontend");
  await $`pnpm i`;
  await $`pnpm build`;
}
