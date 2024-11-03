import * as Yup from "yup";

export type UserModalSchema = {
  first_name: String;
  last_name: String;
  email: String;
  team_id: Number | null;
  user_password?: String;
  user_role: String;
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
  first_name: Yup.string().required("First name is a required filed"),
  last_name: Yup.string().required("Last name is a required filed"),
  email: Yup.string().email().required("Email is a required field"),
  // team: Yup.string().required("Please select a team"),
  user_password: Yup.string().required("Password is a required field"),
  // role: Yup.string().required("Role is a required field"),
});

export const validationTeamSchema = Yup.object().shape({
  team_id: Yup.number(),
  // .required("Team name is a required filed"),
});
