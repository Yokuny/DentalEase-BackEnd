import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { passwordRegex } from "../../../src/helpers/regex.helper";
import type { NewUser } from "../../../src/models";

export function createRandomUser(): NewUser {
  return {
    username: faker.person.fullName(),
    email: faker.internet.email(),
    password: new RandExp(passwordRegex).gen(),
  };
}
