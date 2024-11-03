import * as Yup from "yup";

export type TeamModalSchema = {
  team_name: String;
};

export const initialValues: TeamModalSchema = {
  team_name: "",
};

export const validationTeamSchema = Yup.object().shape({
  team_name: Yup.string().required("Team name is a required filed"),
});
