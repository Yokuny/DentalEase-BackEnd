export const lengthMessage = (min: number, max: number) => ({
  message: `O campo deve ter ${min ? `${min} a ${max} caracteres.` : `no máximo ${max} caracteres`}`,
});

export const mailMessage = () => ({
  message: `O campo deve ser um email válido`,
});

export const passwordMessage = () => ({
  message: "Digite uma senha forte",
});

export const passRegexMessage = () => ({
  message: `O campo deve ter ao menos uma letra e um número`,
});

export const objectIdMessage = () => ({
  message: `ID fornecido tem formato inválido`,
});
