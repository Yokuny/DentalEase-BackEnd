import * as respository from "../repositories/schedule.repository";
import { getPatient } from "./patient.service";
import { getClinicDoctor } from "./clinic.service";
import { getService } from "./service.service";
import { stringToData } from "../helpers/convert.helper";
import { returnMessage, returnData, returnDataMessage } from "../helpers/responsePattern.helper";
import type { ServiceRes } from "../helpers/responsePattern.helper";
import { CustomError } from "../models";
import type { ClinicUser, NewSchedule, QueryId } from "../models";

const getSchedule = async (id: string) => {
  const schedule = await respository.getScheduleById(id);
  if (!schedule) throw new CustomError("Agendamento não encontrado", 404);

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

export const getScheduleRegister = async (user: ClinicUser, query: QueryId): Promise<ServiceRes> => {
  if (query.id) return returnData(await getSchedule(query.id));
  if (query.Patient) return returnData(await getScheduleByPatient(query.Patient, true));
  if (query.Odontogram) return returnData(await getScheduleByOdontogram(query.Odontogram, true));

  const schedules = await getAllSchedules(user.clinic);

  if (!schedules || schedules.length === 0) return returnMessage("Nenhum agendamento encontrado");
  return returnData(schedules);
};

export const getPartialScheduleRegister = async (user: ClinicUser): Promise<ServiceRes> => {
  const schedules = await respository.getPartialSchedulesRegister(user.clinic);
  if (!schedules || schedules.length === 0) return new CustomError("Nenhum agendamento encontrado", 404);

  const partialSchedules = schedules.map((schedule) => {
    return {
      _id: schedule._id,
      patient: schedule.patient.name,
      doctor: schedule.doctor.name,
      service: schedule.service.workToBeDone,
      startTime: schedule.startTime,
      endTime: schedule.endTime ? schedule.endTime : new Date(+schedule.startTime + 30 * 60000),
    };
  });

  if (!partialSchedules || partialSchedules.length === 0) return returnMessage("Nenhum agendamento encontrado");
  return returnData(partialSchedules);
};

const checkDate = (data: NewSchedule) => {
  const startTime = stringToData(data.startTime);
  const endTime = stringToData(data.endTime);
  if (endTime && startTime > endTime) throw new CustomError("Data inicial maior que a final", 406);
};

export const postSchedule = async (user: ClinicUser, data: NewSchedule): Promise<ServiceRes> => {
  const serviceFount = await getService(data.Service);

  const hasEndTime = data.endTime && data.endTime !== "";
  if (hasEndTime) checkDate(data);

  const newSchedule = {
    ...data,
    Clinic: user.clinic,
    Patient: serviceFount.Patient,
    Doctor: serviceFount.Doctor,
  };

  if (hasEndTime) newSchedule.endTime = String(stringToData(data.endTime));

  const register = await respository.postSchedule(newSchedule);
  if (register) {
    const register_id = { _id: register._id.toString() };
    return returnDataMessage(register_id, "Agendamento cadastrado");
  }
  throw new CustomError("Erro ao cadastrar agendamento", 502);
};

export const updateSchedule = async (user: ClinicUser, id: string, data: NewSchedule): Promise<ServiceRes> => {
  const schedule = await getSchedule(id);
  if (schedule.Clinic.toString() !== user.clinic) throw new CustomError("Agendamento não pertence a clínica", 406);

  data.endTime && checkDate(data);

  const update = await respository.updateSchedule(schedule._id, data);
  if (update) return returnMessage("Agendamento atualizado");

  throw new CustomError("Erro ao atualizar agendamento", 502);
};

export const deleteSchedule = async (user: ClinicUser, id: string): Promise<ServiceRes> => {
  const schedule = await getSchedule(id);
  if (schedule.Clinic.toString() !== user.clinic) throw new CustomError("Agendamento não pertence a clínica", 406);

  const register = await respository.deleteSchedule(schedule._id);

  if (register.deletedCount === 1) return returnMessage("Agendamento deletado");
  else throw new CustomError("Agendamento não deletado", 406);
};
