import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { cpfRegex, rgRegex, phoneRegex, cepRegex } from "../../../src/helpers/regex.helper";
import type { NewPatient, Anamnesis, Intraoral, ClinicPatient } from "../../../src/models";

export function createRandomPatient(): NewPatient {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    cpf: new RandExp(cpfRegex).gen(),
    rg: new RandExp(rgRegex).gen(),
    birthdate: faker.date.past(),
    sex: faker.helpers.arrayElement(["M", "F"]),
    phone: new RandExp(phoneRegex).gen(),
    cep: new RandExp(cepRegex).gen(),
    address: faker.location.streetAddress(),
  };
}
