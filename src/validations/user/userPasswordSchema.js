import * as yup from 'yup';

export const userPasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required('La contraseña actual es obligatoria'),

  newPassword: yup
    .string()
    .min(6, 'Minimo 6 caracteres')
    .required('La nueva contraseña es obligatoria'),

  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden')
    .required('Debes confirmar la nueva contraseña'),
});
