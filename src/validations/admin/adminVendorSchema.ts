import * as yup from 'yup';

export const adminVendorSchema = yup.object({
  displayName: yup
    .string()
    .trim()
    .required('El nombre del comercio es obligatorio')
    .max(80, 'Maximo 80 caracteres'),

  email: yup
    .string()
    .trim()
    .email('Email invalido')
    .required('El email es obligatorio'),

  phone: yup
    .string()
    .trim()
    .nullable()
    .notRequired()
    .matches(/^[0-9+\s\-]{0,20}$/, 'Telefono invalido'),

  street: yup
    .string()
    .trim()
    .required('La calle es obligatoria')
    .max(100, 'Maximo 100 caracteres'),

  city: yup
    .string()
    .trim()
    .required('La ciudad es obligatoria')
    .max(60, 'Maximo 60 caracteres'),

  province: yup
    .string()
    .trim()
    .required('La provincia es obligatoria')
    .max(60, 'Maximo 60 caracteres'),

  active: yup
    .boolean()
    .default(true),
});
