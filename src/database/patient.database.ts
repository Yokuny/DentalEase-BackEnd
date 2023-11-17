import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  nome: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  cpf: {
    type: String,
    minlength: 11,
    maxlength: 11,
    required: true,
    unique: true,
  },
  rg: {
    type: String,
    minlength: 9,
    maxlength: 9,
    required: true,
    unique: true,
  },
  dataNascimento: {
    type: Date,
    required: true,
  },
  sexo: {
    type: String,
    enum: ["M", "F"],
    required: true,
  },
  telefone: {
    type: String,
    minlength: 11,
    maxlength: 11,
    required: true,
  },
  cep: {
    type: String,
    minlength: 8,
    maxlength: 8,
    required: true,
  },
  logradouro: {
    type: String,
    minlength: 5,
    maxlength: 50,
  },
});

export const Patient = mongoose.model("Patient", patientSchema);
