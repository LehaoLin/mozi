The simplest and most practical Node.js backend template, suitable for quickly setting up small-scale backends.

## Run the project

`pnpm i`

`pnpm dev`

## DB: NEDB

All db operations are in `db.js`. And data is under `./data`

- `db_connect` to create and connect db
- `db_insert` to add data
- `db_find` to return array of data
- `db_remove` to remove data

## API

You can write backend APIs in `index.js`

## Session

All sessions store under the `./sessions`

## Static File

Please place all static files under `./public`. And use url `/static/...` to access.

## Template Code

You can use it like template repo into new repos.
