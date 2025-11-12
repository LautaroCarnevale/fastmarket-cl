import * as yup from 'yup'

export const checkoutSchema = yup.object({
  name: yup
    .string()
    .min(4, 'Minimo 4 caracteres')
    .max(50, 'Maximo 50 caracteres')
    .required('Campo obligatorio'),

  surname: yup
    .string()
    .min(4, 'Minimo 4 caracteres')
    .max(50, 'Maximo 50 caracteres')
    .required('Campo obligatorio'),

  phone: yup
    .string()
    .matches(/^\+?\d(?:[\s-]?\d){7,14}$/, 'Telefono invalido')
    .required('Campo obligatorio'),

  paymentMethod: yup
    .string()
    .oneOf(['cash', 'card', 'transfer'], 'Elige un metodo de pago')
    .required('Campo obligatorio'),

  notes: yup
    .string()
    .max(200, 'Maximo 200 caracteres')
    .optional(),
})
