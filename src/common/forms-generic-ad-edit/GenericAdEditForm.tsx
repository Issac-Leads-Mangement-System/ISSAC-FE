import React, { PropsWithChildren } from "react";
import { Form, Formik, FormikProps } from "formik";
// import { AnySchema } from "yup/lib/schema";
// import { ButtonType, ButtonTypes } from "../../components/common/button/models";
import Button from "../Button/Button";

export interface IEditFormsProps<EntityType> {
  initialValues: EntityType;
  validationSchema: any;
  apiRequest: Function;
  hasSubmitButton?: boolean;
  validateOnChange?: boolean;
  form: (formikProps: FormikProps<EntityType>) => any;
  formikRef?: any;
  submitBtnName?: string;
}

export function GenericAddEditForm<EntityType>(
  props: PropsWithChildren<IEditFormsProps<EntityType>>
) {
  const handleSubmit = (values: EntityType, { setSubmitting }: any) => {
    props.apiRequest(values, setSubmitting);
  };

  return (
    <Formik<any>
      innerRef={props.formikRef ? props.formikRef : undefined}
      initialValues={props.initialValues}
      onSubmit={handleSubmit}
      validationSchema={props.validationSchema}
      validateOnChange={props.validateOnChange || false}
      validateOnBlur={false}
      enableReinitialize
    >
      {(formikProps) => (
        <Form>
          {props.form(formikProps)}
          {props.hasSubmitButton && (
            <Button
              type={"primary"}
              name={props.submitBtnName || "Submit form"}
              buttonType={"submit"}
              disabled={formikProps.isSubmitting}
              className="submit-form"
            />
          )}
        </Form>
      )}
    </Formik>
  );
}
