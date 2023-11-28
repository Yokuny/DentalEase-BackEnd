import app from "../src/index";
import supertest from "supertest";

describe("GET /", () => {
  it("should return Status: 200 with a 'Welcome to the Dental Ease API!' message", async () => {
    const result = await supertest(app).get("/");

    const status = result.status;
    const message = result.text;

    expect(status).toEqual(200);
    expect(message).toEqual("Welcome to the Dental Ease API!");
  });
});

describe("GET /health", () => {
  it("should return Status: 200 with a 'OK!' message", async () => {
    const result = await supertest(app).get("/health");

    const status = result.status;
    const message = result.text;

    expect(status).toEqual(200);
    expect(message).toEqual("OK!");
  });
});

describe("GET /time", () => {
  it("should return Status: 200 with a current date", async () => {
    const result = await supertest(app).get("/time");
    const status = result.status;
    const message = result.body;

    const date = message.split("T")[0];
    const serverDate = new Date(date);

    const currentData = new Date();
    const newDate = currentData.toISOString().split("T")[0];
    const currentServerDate = new Date(newDate);

    expect(status).toEqual(200);
    expect(serverDate).toEqual(currentServerDate);
  });
});
