import * as Yup from "yup";

export type UserModalSchema = {
  first_name: string;
  last_name: string;
  email: string;
  team_id: number | null;
  user_password?: string;
  user_role: string;
};

export const initialValues: UserModalSchema = {
  first_name: "",
  last_name: "",
  email: "",
  team_id: null,
  user_password: "",
  user_role: "",
};

export const validationUserSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is a required filed!"),
  last_name: Yup.string().required("Last name is a required filed!"),
  email: Yup.string().email().required("Email is a required field!"),
  user_password: Yup.string().required("Password is a required field!"),
  user_role: Yup.string().required("Role is a required field!"),
  team_id: Yup.number().required("Team is a required field!"),
});
