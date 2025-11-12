// src/validation/user/userSettingsSchema.js
import * as yup from 'yup';

export const userSettingsSchema = yup.object({
  firstName: yup
    .string()
    .required('El nombre es obligatorio')
    .max(60, 'Máximo 60 caracteres'),

  lastName: yup
    .string()
    .required('El apellido es obligatorio')
    .max(60, 'Máximo 60 caracteres'),

  email: yup
    .string()
    .email('Email inválido')
    .required('El email es obligatorio'),

  phone: yup
    .string()
    .required('El teléfono es obligatorio')
    .matches(/^[0-9+\s-]{7,20}$/, 'Teléfono inválido'),

  idNumber: yup
    .string()
    .nullable()
    .notRequired()
    .max(30, 'Máximo 30 caracteres'),

  birthDate: yup
    .date()
    .nullable()
    .typeError('Fecha inválida'),

  gender: yup
    .string()
    .oneOf(['Hombre', 'Mujer'], 'Género inválido')
    .nullable()
    .notRequired(),
});
