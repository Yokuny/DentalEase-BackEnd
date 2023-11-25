import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
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
  },
  rg: {
    type: String,
    minlength: 7,
    maxlength: 7,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    enum: ["M", "F"],
    required: true,
  },
  phone: {
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
  address: {
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  clinic: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Patient = mongoose.model("Patient", patientSchema);
