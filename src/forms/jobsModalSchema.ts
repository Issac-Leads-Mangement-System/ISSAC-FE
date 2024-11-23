import * as Yup from "yup";

export type IJobsModalSchema = {
  job_name: string;
  
  
};

export const initialValues: IJobsModalSchema = {
  job_name: '',
  
};

export const validationJobsSchema = Yup.object().shape({
  job_name: Yup.string().required("Please add a job name")
});
