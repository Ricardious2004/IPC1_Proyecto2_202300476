import { z } from 'zod';

export const registerSchema = z.object({
  carnet: z.string({
    required_error: 'Carnet is required',
  }),
  nombres: z.string({
    required_error: 'First name is required',
  }),
  apellidos: z.string({
    required_error: 'Last name is required',
  }),
  genero: z.string({
    required_error: 'Gender is required',
  }),
  facultad: z.string({
    required_error: 'Faculty is required',
  }),
  carrera: z.string({
    required_error: 'Career is required',
  }),
  correo: z.string({
    required_error: 'Email is required',
  }).email({
    message: 'Invalid email format',
  }),
  contrasena: z.string({
    required_error: 'Password is required',
  }).min(8, {
    message: 'Password must be at least 8 characters long',
}).refine(value => (
    /[A-Z]/.test(value) && 
    /[a-z]/.test(value) && 
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value) &&
    value.length > 0
), {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character',
}),
}); 

export const loginSchema = z.object({
  carnet: z.string({
    required_error: 'Carnet is required',
  }),
  contrasena: z.string({
    required_error : 'Password is required',
  }).min(8, {
    message: 'Password must be at least 8 characters long',
}).refine(value => (
    /[A-Z]/.test(value) && 
    /[a-z]/.test(value) && 
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value) &&
    value.length > 0
), {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character'
}),
});