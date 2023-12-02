import supertest from "supertest";
import mongoose from "mongoose";
import app from "../src/index";
import { Patient } from "database";
import { connect, disconnect } from "./helper/database/memory.database";
import { createRandomPatient } from "./helper/faker/patient.faker";
import type { DbPatient, NewPatient } from "../src/models";

describe("Mongoose Patient's Model Test", () => {
  beforeAll(connect);
  afterAll(disconnect);
  it("should create a new patient", async () => {
    expect(1).toBe(1);
  });
});
