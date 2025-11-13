import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('El nombre es obligatorio'),

  description: yup
    .string()
    .trim()
    .max(500, 'Maximo 500 caracteres')
    .nullable(),

  priceAmount: yup
    .number()
    .typeError('El precio debe ser un numero')
    .required('El precio es obligatorio')
    .min(0.01, 'El precio debe ser mayor a 0'),

  priceCurrency: yup
    .string()
    .oneOf(['ARS', 'USD'], 'Moneda invalida')
    .required('La moneda es obligatoria'),

  categoryId: yup
    .string()
    .required('La categoria es obligatoria'),

  active: yup
    .boolean()
    .required(),

  imageUrl: yup
    .string()
    .transform((value) => (value === '' ? null : value))
    .nullable()
    .url('La URL de la imagen no es valida')
    .notRequired(),
});
