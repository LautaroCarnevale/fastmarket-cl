import * as yup from 'yup';

export const userSettingsSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .max(60, 'Maximo 60 caracteres'),

  surname: yup
    .string()
    .required('El apellido es obligatorio')
    .max(60, 'Maximo 60 caracteres'),

  email: yup
    .string()
    .email('Email inválido')
    .required('El email es obligatorio'),

  phone: yup
    .string()
    .required('El telefono es obligatorio')
    .matches(/^[0-9+\s-]{7,20}$/, 'Teléfono invalido'),

  idNumber: yup
    .string()
    .nullable()
    .notRequired()
    .max(30, 'Maximo 30 caracteres'),

  birthDate: yup
    .date()
    .nullable()
    .typeError('Fecha invalida'),

  gender: yup
    .string()
    .oneOf(['Hombre', 'Mujer'], 'Genero invalido')
    .nullable()
    .notRequired(),
});
