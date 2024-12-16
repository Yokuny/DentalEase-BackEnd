import { Request } from "express";
import { ObjectId } from "mongodb";

import { NewClinic } from "../schemas/clinic.schema";
import { NewPatient, NewAnamnesis, NewIntraoral } from "../schemas/patient.schema";
import { NewOdontogram } from "../schemas/odontogram.schema";
import { NewFinancial } from "../schemas/financial.schema";
import { NewSchedule } from "../schemas/schedule.schema";
import { NewProcedures } from "../schemas/procedure.schema";

type Clinic = { Clinic: string };
type Patient = { Patient: string };

export type ClinicUser = { clinic: string; user: string };
export type AuthReq = Request & { clinicUser: ClinicUser };

export type PartialUser = {
  name: string;
  email: string;
  clinic: string;
  image: string | null;
};

export type PartialClinic = {
  _id: string;
  name: string;
  email: string;
  code: string;
  cnpj: string;
  users: { name: string; email: string; role: "admin" | "doctor" | "assistant" }[];
};

export type UserWithoutPassword = {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  clinic: string;
  createdAt: Date;
};
export type DbUser = UserWithoutPassword & { password: string };

type ClinicUsers = { user: string; role: string };
export type ClinicWithUser = NewClinic & { users: ClinicUsers[] };
export type DbClinic = NewClinic & { _id: ObjectId; users: ClinicUsers[]; createdAt: Date };

export type ClinicPatient = NewPatient & Clinic & { image: string; anamnese: NewAnamnesis; intraoral: NewIntraoral };
export type DbPatient = ClinicPatient & { _id: ObjectId; createdAt: Date };
export type DbAnamnesis = NewAnamnesis & Patient;
export type DbIntraoral = NewIntraoral & Patient;

export type procedureData = {
  procedure?: string;
  price?: number;
  status?: "pending" | "paid" | "canceled";
};

export type PartialOdontogram = {
  _id: string;
  procedures: procedureData[];
  finished: boolean;
  patient: { name: string; _id: string };
  doctor: { name: string; _id: string };
};
export type ClinicOdontogram = NewOdontogram & Clinic;
export type DbOdontogram = ClinicOdontogram & { _id: ObjectId; createdAt: Date };

export type PartialFinancial = {
  _id: string;
  patient: { name: string; _id: string };
  doctor: { name: string; _id: string };
  price: number;
  status: "Pendente" | "Pago" | "Parcial" | "Cancelado";
  createdAt: Date;
};
export type ClinicFinancial = NewFinancial & Clinic;
export type DbFinancial = ClinicFinancial & { _id: ObjectId; createdAt: Date };
export type detailedFinancialRegister = DbFinancial & {
  patient: {
    _id: ObjectId;
    name: string;
    image: string;
    email: string;
    phone: string;
    cpf: string;
    rg: string;
    sex: string;
    birthdate: Date;
  };
  doctor: { _id: ObjectId; name: string; image: string };
};

export type PartialSchedule = {
  _id: string;
  startTime: string;
  endTime: string;
  patient: { name: string };
  doctor: { name: string };
  service: { procedures: procedureData[] };
};

export type ClinicSchedule = NewSchedule & Clinic;
export type DbSchedule = ClinicSchedule & { _id: ObjectId; createdAt: Date };

export type ClinicProcedures = NewProcedures & Clinic & { updatedAt: Date };