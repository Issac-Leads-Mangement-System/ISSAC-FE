import * as Yup from 'yup';

export type LoginSchema = {
  email: String,
  password: String
}

export const initialValues: LoginSchema = {
  email: '',
  password: '',
};

// export const validationSchema = Yup.object().shape({
//   email: Yup.string().email().required('Email is a required field'),
//   password: Yup.string().required('Password is a required field'),
// });