import * as respository from "../repositories/schedule.repository";
import { getPatient } from "./patient.service";
import { getClinicDoctor } from "./clinic.service";
import { getService } from "./service.service";
import { stringToData } from "../helpers/convert_data.helper";
import { CustomError } from "../models";
import type { ClinicUser, NewSchedule, QueryId } from "../models";

const getScheduleById = async (id: string, required?: boolean) => {
  const schedule = await respository.getScheduleById(id);
  if (!schedule && required) throw new CustomError("Agendamento não encontrado", 404);

  return schedule;
};

const getScheduleByPatient = async (patient: string, required?: boolean) => {
  const schedule = await respository.getScheduleByPatient(patient);
  if (!schedule && required) throw new CustomError("Agendamento não encontrado", 404);

  return schedule;
};

const getScheduleByOdontogram = async (odontogram: string, required?: boolean) => {
  const schedule = await respository.getScheduleByOdontogram(odontogram);
  if (!schedule && required) throw new CustomError("Agendamento não encontrado", 404);

  return schedule;
};

const getAllSchedules = async (clinic: string) => {
  const schedules = await respository.getAllSchedules(clinic);
  if (!schedules) throw new CustomError("Agendamentos não encontrados", 404);

  return schedules;
};

export const getSchedule = async (user: ClinicUser, query: QueryId) => {
  if (query.id) return await getScheduleById(query.id, true);
  if (query.Patient) return await getScheduleByPatient(query.Patient, true);
  if (query.Odontogram) return await getScheduleByOdontogram(query.Odontogram, true);

  const response = await getAllSchedules(user.clinic);
  if (response) return response;

  throw new CustomError("Erro ao buscar agendamentos", 502);
};

const checkDate = (data: NewSchedule) => {
  const initialDate = stringToData(data.initianDate);
  const finalDate = stringToData(data.finalDate);
  if (finalDate && initialDate > finalDate) throw new CustomError("Data inicial maior que a final", 406);
};

export const postSchedule = async (user: ClinicUser, data: NewSchedule) => {
  await getPatient(data.Patient);
  await getClinicDoctor(user.clinic, data.Doctor);
  await getService(data.Service);

  const hasFinalDate = data.finalDate && data.finalDate !== "";
  if (hasFinalDate) checkDate(data);

  const newSchedule = {
    ...data,
    Clinic: user.clinic,
  };

  if (hasFinalDate) newSchedule.finalDate = String(stringToData(data.finalDate));

  const register = await respository.postSchedule(newSchedule);
  if (register) return "Agendamento cadastrado";

  throw new CustomError("Erro ao cadastrar agendamento", 502);
};

export const updateSchedule = async (id: string, data: NewSchedule) => {
  await getScheduleById(id, true);
  await getPatient(data.Patient);

  data.finalDate && checkDate(data);
  delete data.Patient;

  const update = await respository.updateSchedule(id, data);
  if (update) return "Agendamento atualizado";

  throw new CustomError("Erro ao atualizar agendamento", 502);
};

export const deleteSchedule = async (id: string) => {
  const register = await respository.deleteSchedule(id);

  if (register.deletedCount === 1) return "Agendamento deletado";
  else throw new CustomError("Agendamento não deletado", 406);
};
