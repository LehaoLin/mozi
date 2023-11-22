#!/usr/bin/env zx

const exists = await fs.pathExists("./frontend");
if (exists) {
  echo("The frontend dir already exists? Please delete it.");
} else {
  await $`pnpm create vite frontend --template vue`;
  cd("./frontend");
  await $`pnpm i`;
  await $`pnpm build`;
}
