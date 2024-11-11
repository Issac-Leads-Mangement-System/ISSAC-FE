import * as Yup from "yup";

export type ILeadsStatusModal = {
  status_name: string;
}

export const initialValues: ILeadsStatusModal = {
  status_name: "",
}

export const validationLeadsStatusSchema = Yup.object().shape({
  status_name: Yup.string().required("Status name is a required filed!"),
});