import { numClean } from "./sanitize.helper";

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const stringToData = (data: string | Date) => new Date(data);

export const formatCnpj = (cnpjReceived: string) => {
  const cnpj = numClean(cnpjReceived);
  if (cnpj.length !== 14) return cnpj;

  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`;
};
