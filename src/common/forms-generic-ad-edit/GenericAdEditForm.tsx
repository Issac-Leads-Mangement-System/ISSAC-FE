import { PropsWithChildren } from "react";
import { Form, Formik, FormikProps } from "formik";

import Button from "../Button/Button";
import { Box } from "@mui/material";

export interface IEditFormsProps<EntityType> {
  initialValues: EntityType;
  validationSchema: any;
  apiRequest: Function;
  hasSubmitButton?: boolean;
  validateOnChange?: boolean;
  form: (formikProps: FormikProps<EntityType>) => any;
  formikRef?: any;
  submitBtnName?: string;
  btnStyle?: object;
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
      validate={props.validationSchema}
      validateOnChange={props.validateOnChange || false}
      validateOnBlur={false}
      enableReinitialize
    >
      {(formikProps) => (
        <Form>
          <Box>
            {/* add style to the entire form */}
            {props.form(formikProps)}
            {props.hasSubmitButton && (
              <Box mt={4} display="flex" gap={1} justifyContent="flex-end">
                <Button
                  type={"primary"}
                  name={props.submitBtnName || "Submit form"}
                  buttonType={"submit"}
                  disabled={formikProps.isSubmitting}
                  // style={props.btnStyle}
                  sx={{
                    bgcolor: "#17a2b8",
                    color: "#fff",
                    borderRadius: 8,
                    width: "45%",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#138496",
                    },
                  }}
                />
              </Box>
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
}
