// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const { seedMusician } = require("./seedData");

describe("./musicians endpoint", () => {
  // Write your tests here

  test("Testing musicians endpoint", async () => {
    const response = await request(app).get("/musicians");
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(responseData)).toBe(true);
    expect(responseData.length).toBeGreaterThan(0);
  });

  test("Tesing finding musician by id", async () => {
    const response = await request(app).get("/musicians/1");
    const musician = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(musician).toHaveProperty("name");
  });

  test("Testing creating a new musician", async () => {
    const newMusician = {
      name: "Peso Pluma",
      instrument: "Vocals",
    };

    const response = await request(app).post("/musicians").send(newMusician);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(newMusician.name);
    expect(response.body.instrument).toBe(newMusician.instrument);
  });

  test("Testing updating a musician", async () => {
    const updatedMusician = {
      name: "Bad Bunny",
      instrument: "Vocals",
    };

    const response = await request(app)
      .put("/musicians/1")
      .send(updatedMusician);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updatedMusician.name);
    expect(response.body.instrument).toBe(updatedMusician.instrument);
  });

  test("Testing delete a musician", async () => {
    const response = await request(app).delete("/musicians/1");

    expect(response.statusCode).toBe(200);
  });
});
