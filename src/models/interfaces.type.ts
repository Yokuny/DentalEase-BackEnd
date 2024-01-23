import { Request } from "express";
import { NewClinic } from "../schemas/clinic.schema";
import { NewPatient, NewAnamnesis, NewIntraoral } from "../schemas/patient.schema";
import { NewOdontogram } from "../schemas/odontogram.schema";
import { NewService } from "../schemas/service.schema";
import { NewSchedule } from "../schemas/schedule.schema";

type Clinic = { Clinic: string };
type Patient = { Patient: string };

export type ClinicUser = { clinic: string; user: string };
export type AuthReq = Request & { clinicUser: ClinicUser };

export type UserWithoutPassword = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  clinic: string;
  createdAt: Date;
};
export type DbUser = UserWithoutPassword & { password: string };

type ClinicUsers = { user: string; role: string };
export type ClinicWithUser = NewClinic & { users: ClinicUsers[] };
export type DbClinic = NewClinic & { id: string; users: ClinicUsers[]; createdAt: Date };

export type ClinicPatient = NewPatient & Clinic & { anamnese: NewAnamnesis; intraoral: NewIntraoral };
export type DbPatient = ClinicPatient & { id: string; createdAt: Date };
export type DbAnamnesis = NewAnamnesis & Patient;
export type DbIntraoral = NewIntraoral & Patient;

export type ClinicOdontogram = NewOdontogram & Clinic;
export type DbOdontogram = ClinicOdontogram & { id: string; createdAt: Date };

export type ClinicService = NewService & Clinic;
export type DbService = ClinicService & { id: string; createdAt: Date };

export type ClinicSchedule = NewSchedule & Clinic;
export type DbSchedule = ClinicSchedule & { id: string; createdAt: Date };
