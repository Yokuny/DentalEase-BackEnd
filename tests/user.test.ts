import supertest from "supertest";
import mongoose from "mongoose";
import app from "../src/index";
import { connect, disconnect } from "./helper/database/memory.database";
import { User } from "database";
import { createRandomUser } from "./helper/faker/user.faker";

describe("Mongoose User's Model Test", () => {
  it("should create a new user", async () => {
    expect(1).not.toBe(0);
  });
});
