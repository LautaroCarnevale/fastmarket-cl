import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup
  .string()
  .trim()
  .min(4, 'Minimo 4 caracteres')
  .required('Campo obligatorio'),
  
  surname: yup
  .string()
  .trim()
  .min(4, 'Minimo 4 caracteres')
  .required('Campo obligatorio'),
  
  email: yup
  .string()
  .email('Email invalido')
  .required('Campo obligatorio'),
  
  password: yup
  .string()
  .min(6, 'Minimo 6 caracteres')
  .required('Campo obligatorio'),
});
