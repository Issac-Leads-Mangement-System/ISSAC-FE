import * as Yup from "yup";

export type ILeadsTypesModalSchema = {
  type_name: string;
 
};

export const initialValues: ILeadsTypesModalSchema = {
  type_name: "",
};

export const validationLeadsTypesSchema = Yup.object().shape({
  type_name: Yup.string()
});
