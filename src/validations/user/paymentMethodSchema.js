import * as yup from 'yup';

export const paymentMethodSchema = yup.object({
  cardNumber: yup
    .string()
    .required('Campo obligatorio')
    .matches(/^\d{16}$/, 'El numero debe tener 16 dígitos'),

  nameOnCard: yup
    .string()
    .required('Campo obligatorio')
    .min(4, 'Minimo 4 caracteres'),

  expiryMonth: yup
    .string()
    .required('Campo obligatorio')
    .matches(/^(0?[1-9]|1[0-2])$/, 'Mes invalido (1 a 12)'),

  expiryYear: yup
    .string()
    .required('Campo obligatorio')
    .matches(/^\d{4}$/, 'Año invalido (4 dígitos)'),

  cvv: yup
    .string()
    .required('Campo obligatorio')
    .matches(/^\d{3}$/, 'Debe tener 3 '),
});
