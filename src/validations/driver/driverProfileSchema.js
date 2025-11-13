import * as yup from 'yup';

export const driverProfileSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('El nombre es obligatorio')
    .max(60, 'Maximo 60 caracteres'),

  surname: yup
    .string()
    .trim()
    .required('El apellido es obligatorio')
    .max(60, 'Maximo 60 caracteres'),

  phone: yup
    .string()
    .trim()
    .required('El telefono es obligatorio')
    .matches(/^[0-9+\s\-]{7,20}$/, 'Telefono invalido'),

  vehicleType: yup
    .string()
    .oneOf(['bike', 'motorbike', 'car'], 'Tipo de vehiculo invalido')
    .required('El tipo de vehiculo es obligatorio'),

  plate: yup
    .string()
    .trim()
    .max(15, 'Maximo 15 caracteres')
    .required('La patente es obligatoria'),

  brand: yup
    .string()
    .trim()
    .max(40, 'Maximo 40 caracteres')
    .required('La marca es obligatoria'),

  model: yup
    .string()
    .trim()
    .max(40, 'Maximo 40 caracteres')
    .required('El modelo es obligatorio'),

  color: yup
    .string()
    .trim()
    .max(30, 'Maximo 30 caracteres')
    .required('El color es obligatorio'),
});
