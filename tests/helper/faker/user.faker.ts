import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { passwordRegex } from "../../../src/helpers/regex.helper";

export function createRandomUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: new RandExp(passwordRegex).gen(),
  };
}
