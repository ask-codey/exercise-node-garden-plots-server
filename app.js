// The garden's request handler. For you to finish.
//
// Node calls app(req, res) once for every request. Answer each request below with its status code and a JSON body,
// and send the header Content-Type: application/json with every answer, 404s included.
//
//   GET /plots              200, every plot in plots.js
//   GET /plots?free=true    200, only the free plots (their gardener is null): plots 2, 5 and 8
//   GET /plots?free=false   200, every plot: only the text "true" means free
//   GET /plots/7            200, plot 7 (every plot's number works the same way)
//   GET /plots/99           404, { "message": "There's no plot 99." }
//   GET /plots/seven        404, { "message": "There's no plot seven." }
//   GET /compost            404, { "message": "There's nothing at /compost." }
//                           (any other path, named by its path without the query string)
//
// For now, app answers every request with a 404 that says it isn't built yet.
import { plots } from "./plots.js";

export function app(req, res) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Not built yet." }));
}
