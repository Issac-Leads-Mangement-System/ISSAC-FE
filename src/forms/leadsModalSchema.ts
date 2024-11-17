import * as Yup from "yup";

export type ILeadsModalSchema = {
  type_id: number | undefined;
  file: File[];
  
  
};

export const initialValues: ILeadsModalSchema = {
  type_id: undefined,
  file: []
  
};

export const validationLeadsSchema = Yup.object().shape({
  type_id: Yup.number().required("Please select a type")
});
