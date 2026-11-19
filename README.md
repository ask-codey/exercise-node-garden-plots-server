# Exercise: Community Garden Server

Exercise code for the lesson **Exercise: Community Garden Server** in the Node.js in Depth course on [ask-codey.com](https://www.ask-codey.com).

Greenleaf Community Garden wants neighbors to check its plots from their phones. You'll finish the garden's server in `app.js`, with Node's own `node:http` module and no framework: the list of plots, only the free ones, one plot by its number, and a 404 with a clear message for anything else. Tests check every answer.

## What's here

- `app.js`: the request handler, `app(req, res)`, which Node calls once for every request. For now it answers every request with a 404 that says it isn't built yet. The comment at the top lists every request it should answer, and how. For you to finish.
- `plots.js`: the garden's eight plots. A free plot's `gardener` is `null`. Ready to use.
- `server.js`: starts a server with your handler at `http://localhost:3100`. Ready to use.
- `garden.http`: the requests to try, for VS Code's REST Client extension. Ready to use.
- `app.test.js`: tests that send requests to your handler with Supertest and check each answer. You don't need to change this file.
- `package.json` and `package-lock.json`: the project's settings, its scripts (`start`, `dev` and `test`) and the one package the tests use, Supertest, at an exact version. Ready to use.

## Before you start

In VS Code's terminal, in this folder, install the package the tests use:

```bash
npm install
```

It makes a `node_modules` folder. That folder is in `.gitignore`, so Git leaves it out: `npm install` makes it again on any computer.

## Run it

```bash
npm start
```

The terminal says `The garden's server is listening on http://localhost:3100` and keeps running. Open `garden.http` and click **Send Request** above any request; REST Client shows the answer beside it. Stop the server with **Ctrl+C**.

`npm run dev` starts it with `node --watch`, so it restarts each time you save `app.js`.

## Check your work

```bash
npm test
```

No server needs to be running: the tests hand each request straight to `app`. At first every test fails: that is expected. Each request you answer turns its test green. A failing test's message says what it sent and what it expected, for example *GET /plots/7 should answer 200, but it answered 404.*

## The rules

- Use Node's own `node:http` module, `URL` and `URLSearchParams`. No framework: Express comes in the next chapter.
- Every answer sends the header `Content-Type: application/json` and a JSON body, 404s included.
- Keep the request handler in `app.js` and the `listen` call in `server.js`: the tests import `app` without starting a server.
- Don't change `plots.js`: the tests compare your answers with it.

## Tips

- Build the URL first, with a base address: `new URL(req.url, "http://localhost:3100")`. Then `pathname` is the path and `searchParams` holds the query values.
- Query values are text. `free=false` gives the text `"false"`, which isn't the text `"true"`.
- Split the path at each slash to find a plot's number, and turn that text into a number before you compare it with a plot's `number`.
- Every answer needs `writeHead` and `end`. A small helper function that does both keeps each answer to one line.
- Answer once, then `return`, so the code doesn't carry on to the 404 at the bottom.

## Hand it in

When it works, push your solution to a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. The lesson page shows the Git commands, step by step.
