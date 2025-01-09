import { FormikProps } from "formik";

export const generateFormikInputFieldProps = (
  formikProps: FormikProps<any>,
  path: string
) => {
  const getValueFromObj = (obj: any, objPath: string) => {
    const pathParts = objPath.split(".");
    let currentObj = obj || {};
    for (const pathPart of pathParts) {
      if (Object.prototype.hasOwnProperty.call(currentObj, pathPart)) {
        currentObj = currentObj[pathPart];
      } else {
        return "";
      }
    }
    return currentObj;
  };

  const fieldProps: any = {
    // Aceasta este logica de schimbare pentru input-uri
    onChange: (event: any) => {
      const newValue =
        event.target.type === "checkbox" ? event.target.checked : event.target.value;
      formikProps.setFieldValue(path, newValue);
    },
    error:
      getValueFromObj(formikProps.touched, path) &&
      Boolean(getValueFromObj(formikProps.errors, path))
        ? (getValueFromObj(formikProps.errors, path) as any)
        : undefined,
    disabled: formikProps.isSubmitting,
  };

  // Dacă nu este un input de tip "file", adăugăm `value` pentru input-uri de text
  if (path !== "file") {
    fieldProps.value = getValueFromObj(formikProps.values, path) || "";
  }

  // Dacă este un checkbox, adăugăm `checked`
  if (path.includes("mobility")) { // Ajustează această condiție pentru a se aplica doar pentru checkbox-uri
    fieldProps.checked = getValueFromObj(formikProps.values, path) || false;
  }

  return fieldProps;
};
