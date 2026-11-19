// Tests for app.js. Run them with: npm test (run npm install once first).
// Each test sends one request to your app with Supertest and checks the answer: its status code, its
// Content-Type and its JSON body. No server needs to be running, and no port is used: Supertest hands each
// request to app itself, which is why app.js and server.js are separate files.
// You don't need to change this file.
import { test } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { app } from "./app.js";
import { plots } from "./plots.js";

// Checks the parts every answer shares: its status code and its Content-Type header.
function assertJson(response, status, what) {
  assert.equal(response.status, status, `${what} should answer ${status}, but it answered ${response.status}.`);
  assert.match(response.headers["content-type"] ?? "(none)", /application\/json/,
    `${what} should send the header Content-Type: application/json.`);
}

const plot = (number) => plots.find((p) => p.number === number);

test("1) GET /plots answers 200 with all 8 plots", async () => {
  const response = await request(app).get("/plots");
  assertJson(response, 200, "GET /plots");
  assert.deepEqual(response.body, plots, "The body should be every plot in plots.js, 1 to 8, in order.");
});

test("2) GET /plots?free=true answers 200 with the free plots: 2, 5 and 8", async () => {
  const response = await request(app).get("/plots?free=true");
  assertJson(response, 200, "GET /plots?free=true");
  assert.deepEqual(response.body, [plot(2), plot(5), plot(8)],
    "The body should be plots 2, 5 and 8, the plots whose gardener is null, in order.");
});

test("3) GET /plots?free=false answers 200 with all 8 plots", async () => {
  const response = await request(app).get("/plots?free=false");
  assertJson(response, 200, "GET /plots?free=false");
  assert.deepEqual(response.body, plots,
    "free=false isn't free=true, so the body should be every plot. A query value is text, and \"false\" is text too.");
});

test("4) GET /plots/7 answers 200 with plot 7, Priya's strawberries", async () => {
  const response = await request(app).get("/plots/7");
  assertJson(response, 200, "GET /plots/7");
  assert.deepEqual(response.body, plot(7), "The body should be plot 7 alone, as an object, not inside an array.");
});

test("5) GET /plots/2 answers 200 with plot 2, a free plot", async () => {
  const response = await request(app).get("/plots/2");
  assertJson(response, 200, "GET /plots/2");
  assert.deepEqual(response.body, plot(2), "The body should be plot 2 alone, as an object.");
});

test("6) GET /plots/99 answers 404 with the message \"There's no plot 99.\"", async () => {
  const response = await request(app).get("/plots/99");
  assertJson(response, 404, "GET /plots/99");
  assert.deepEqual(response.body, { message: "There's no plot 99." });
});

test("7) GET /plots/seven answers 404 with the message \"There's no plot seven.\"", async () => {
  const response = await request(app).get("/plots/seven");
  assertJson(response, 404, "GET /plots/seven");
  assert.deepEqual(response.body, { message: "There's no plot seven." });
});

test("8) GET /compost answers 404 with the message \"There's nothing at /compost.\"", async () => {
  const response = await request(app).get("/compost");
  assertJson(response, 404, "GET /compost");
  assert.deepEqual(response.body, { message: "There's nothing at /compost." });
});

test("9) GET /compost?size=small answers 404 with \"There's nothing at /compost.\": the path, without the query string", async () => {
  const response = await request(app).get("/compost?size=small");
  assertJson(response, 404, "GET /compost?size=small");
  assert.deepEqual(response.body, { message: "There's nothing at /compost." },
    "Name the path only. req.url holds the query string too; the URL's pathname doesn't.");
});
