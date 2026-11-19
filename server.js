// Starts the garden's server at http://localhost:3100, using the request handler in app.js.
// Run it with: npm start (or npm run dev, which restarts it each time you save). Stop it with Ctrl+C.
// Ready to use: you don't need to change this file.
import http from "node:http";
import { app } from "./app.js";

const port = 3100;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`The garden's server is listening on http://localhost:${port}`);
});
