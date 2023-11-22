The simplest and most practical Node.js backend template, suitable for quickly setting up small-scale backends.

最爽的方式起个 Nodejs 小后端

## Run the project

`pnpm i`

`pnpm dev`

## DB: NEDB

All db operations are in `db.js`. And data is under `./data`

- `db_connect` to create and connect db
- `db_insert` to add data
- `db_find` to return array of data
- `db_remove` to remove data

How to export the data to json?

- `export.js` to modify `name` variable and `pnpm export`

## API

You can write backend APIs in `api.js`
And socket APIs in `socket_api.js`

## Session

All sessions store under the `./sessions`

## Static File

Please place all static files under `./public`. And use url `/static/...` to access.

## Full stack Development

`pnpm vue`

It will create a frontend dir with a Vue Vite project named `frontend`.

And you should modify the `api.js` to cancel the comment code beside `// for vue project inside`

## Template Code

You can use it like template repo into new repos.
