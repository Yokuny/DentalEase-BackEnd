import * as respository from "../repositories/procedure.repository";
import { returnMessage, returnData } from "../helpers/responsePattern.helper";
import { CustomError } from "../models";
import type { ServiceRes } from "../helpers/responsePattern.helper";
import type { ClinicUser, ClinicProcedure, NewProcedure } from "../models";

export const getProcedure = async (user: ClinicUser): Promise<ServiceRes> => {
  const procedures = await respository.getProcedure(user.clinic);
  if (!procedures) return returnMessage("Procedimentos não encontrados ou não cadastrados");

  return returnData(procedures);
};

const validateCsv = (csvString: string) => {
  const VALID_HEADERS = ["procedimento", "agrupador", "preco_custo", "preco_sugerido", "preco_salvo"];
  const lines = csvString.split("\n");
  const headers = lines[0].split(",");

  if (headers.length !== VALID_HEADERS.length) {
    throw new CustomError(`O cabeçalho do CSV deve ser: ${VALID_HEADERS.join(", ")}`, 400);
  }

  for (let i = 0; i < VALID_HEADERS.length; i++) {
    if (headers[i] !== VALID_HEADERS[i]) throw new CustomError(`Cabeçalho inválido: ${headers[i]}`, 400);
  }

  for (let i = 1; i < lines.length; i++) {
    const allRowData = lines[i].split(",");
    if (allRowData.length !== VALID_HEADERS.length) throw new CustomError("Arquivo CSV inválido", 400);

    const [procedure, group, cost, suggested, saved] = allRowData;
    if (procedure.length < 3 || procedure.length > 100)
      throw new CustomError(`Procedimento inválido: ${procedure}, linha ${i + 1}`, 400);
    if (group.length < 1 || group.length > 50)
      throw new CustomError(`Agrupador inválido: ${group}, linha ${i + 1}`, 400);
    if (typeof cost !== "number" || parseFloat(cost) < 0)
      throw new CustomError(`Preço de custo inválido: ${cost}, linha ${i + 1}`, 400);
    if (typeof suggested !== "number" || parseFloat(suggested) < 0)
      throw new CustomError(`Preço sugerido inválido: ${suggested}, linha ${i + 1}`, 400);
    if (typeof saved !== "number" || parseFloat(saved) < 0)
      throw new CustomError(`Preço salvo inválido: ${saved}, linha ${i + 1}`, 400);
  }
};

export const updateProcedure = async (user: ClinicUser, data: NewProcedure): Promise<ServiceRes> => {
  validateCsv(data.procedure);

  const newProcedure = {
    ...data,
    Clinic: user.clinic,
    updatedAt: new Date(),
  } as ClinicProcedure;

  const register = await respository.updateProcedure(newProcedure, user.clinic);
  if (register.upsertedId) {
    return returnMessage("Procedimento cadastrado com sucesso");
  } else if (register.modifiedCount === 1) {
    return returnMessage("Procedimento atualizado com sucesso");
  }

  throw new CustomError("Cadastro de procedimento não registrado", 502);
};
