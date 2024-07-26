const request = require("supertest");
const express = require("express");
const app = express();
const asanasService = require("./asanasService");

app.get("/asanas", asanasService.getAsanas);
app.get("/asanas/search", asanasService.searchAsanas);
app.get("/asanas/category/:id", asanasService.getAsanasByCategory);
app.get("/asanas/:id", asanasService.getAsanaById);
app.get("/asanas/difficulty/:id", asanasService.getAsanasByDifficulty);

describe("Asanas Service", () => {
  it("should get all asanas", async () => {
    const res = await request(app).get("/asanas");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should search asanas by name", async () => {
    const res = await request(app).get("/asanas/search?name=test");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get asanas by category", async () => {
    const res = await request(app).get("/asanas/category/test");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get asana by id", async () => {
    const res = await request(app).get("/asanas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("should get asanas by difficulty", async () => {
    const res = await request(app).get("/asanas/difficulty/3");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
  it("should get asanas by category", async () => {
    const res = await request(app).get("/asanas/category/armBalance");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
