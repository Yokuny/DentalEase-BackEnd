import { Request } from "express";
import { SignIn, SignUp } from "../schemas/user.schema";
import { NewClinic } from "../schemas/clinic.schema";
import { NewPatient, NewAnamnesis, NewIntraoral } from "../schemas/patient.schema";
import { NewOdontogram } from "../schemas/odontogram.schema";
import { NewService } from "../schemas/service.schema";
import { NewSchedule } from "../schemas/schedule.schema";
//Common
type Clinic = { Clinic: string };
type Patient = { Patient: string };
//Auth
export type ClinicUser = { clinic: string; user: string };
export type JWTPayload = ClinicUser;
export type AuthReq = Request & { clinicUser: JWTPayload };
//User
export type UserWithoutPassword = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  clinic: string;
  createdAt: Date;
};
export type DbUser = UserWithoutPassword & { password: string };
//Patient
export type ClinicPatient = NewPatient & Clinic & { anamnese: NewAnamnesis; intraoral: NewIntraoral };
export type DbPatient = ClinicPatient & { id: string; createdAt: Date };
export type DbAnamnesis = NewAnamnesis & Patient;
export type DbIntraoral = NewIntraoral & Patient;
//Odontogram
export type ClinicOdontogram = NewOdontogram & Clinic;
export type DbOdontogram = ClinicOdontogram & { id: string; createdAt: Date };
//Clinic
type ClinicUsers = { user: string; role: string };
export type ClinicWithUser = NewClinic & { users: ClinicUsers[] };
export type DbClinic = NewClinic & { id: string; users: ClinicUsers[]; createdAt: Date };
