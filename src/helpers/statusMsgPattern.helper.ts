import { CustomError } from "../models/error.type";

type StatusMessage = {
  record: "email" | "cpf" | "rg" | "cnpj" | "code" | "phone";
  searched: string;
  err: number;
};
type EnvironmentParse = StatusMessage & { searchType: "alreadyRegistered" | "notFound" };
type MessageFactory = EnvironmentParse & { environment: "Paciente" | "Clínica" };

const statusMessageFactory = ({ environment, record, searched, searchType, err }: MessageFactory) => {
  const value = searched;

  if (searchType === "notFound")
    throw new CustomError(`${environment} não encontrado com ${record.toUpperCase()} ${value}`, err);

  throw new CustomError(`Já existe ${environment} com o ${record.toUpperCase()} ${value} cadastrado`, err);
};

const patientEnvironment = ({ record, searched, searchType, err }: EnvironmentParse) => {
  const environment = "Paciente";
  return statusMessageFactory({ environment, record, searched, searchType, err });
};

const clinicEnvironment = ({ record, searched, searchType, err }: EnvironmentParse) => {
  const environment = "Clínica";
  return statusMessageFactory({ environment, record, searched, searchType, err });
};

const patientNotFound = ({ record, searched, err }: StatusMessage) =>
  patientEnvironment({ record, searched, searchType: "notFound", err });

const patientAlreadyRegistered = ({ record, searched, err }: StatusMessage) =>
  patientEnvironment({ record, searched, searchType: "alreadyRegistered", err });

const clinicNotFound = ({ record, searched, err }: StatusMessage) =>
  clinicEnvironment({ record, searched, searchType: "notFound", err });

const clinicAlreadyRegistered = ({ record, searched, err }: StatusMessage) =>
  clinicEnvironment({ record, searched, searchType: "alreadyRegistered", err });

export { patientNotFound, patientAlreadyRegistered, clinicNotFound, clinicAlreadyRegistered };
