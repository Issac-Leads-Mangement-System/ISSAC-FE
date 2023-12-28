import { FormikProps } from 'formik';

export const generateFormikInputFieldProps = (formikProps: FormikProps<any>, path: string) => {
  const getValueFromObj = (obj: any, objPath: string) => {
    const pathParts = objPath.split('.');
    let currentObj = obj || {};
    for (const pathPart of pathParts) {
      if (Object.prototype.hasOwnProperty.call(currentObj, pathPart)) {
        currentObj = currentObj[pathPart];
      } else {
        return '';
      }
    }
    return currentObj;
  };

  return ({
    value: getValueFromObj(formikProps.values, path) || '',
    onChange: (val: any) => formikProps.handleChange(path)(val),
    error: (getValueFromObj(formikProps.touched, path) && Boolean(getValueFromObj(formikProps.errors, path)))
      ? getValueFromObj(formikProps.errors, path) as any : undefined,
    disabled: formikProps.isSubmitting,
  });
};