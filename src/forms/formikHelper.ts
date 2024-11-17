// import { FormikProps } from 'formik';

// export const generateFormikInputFieldProps = (formikProps: FormikProps<any>, path: string) => {
//   const getValueFromObj = (obj: any, objPath: string) => {
//     const pathParts = objPath.split('.');
//     let currentObj = obj || {};
//     for (const pathPart of pathParts) {
//       if (Object.prototype.hasOwnProperty.call(currentObj, pathPart)) {
//         currentObj = currentObj[pathPart];
//       } else {
//         return '';
//       }
//     }
//     return currentObj;
//   };

//   return ({
//     value: getValueFromObj(formikProps.values, path) || '',
//     onChange: (val: any) => formikProps.handleChange(path)(val),
//     error: (getValueFromObj(formikProps.touched, path) && Boolean(getValueFromObj(formikProps.errors, path)))
//       ? getValueFromObj(formikProps.errors, path) as any : undefined,
//     disabled: formikProps.isSubmitting,
//   });
// };

import { SelectChangeEvent } from '@mui/material';
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

  return {
    ...(path === 'file' ? {} : { value: getValueFromObj(formikProps.values, path) || '' }), // Nu setăm `value` pentru input-ul `file`
    onChange: (event: any) => {
      if (event.target.files?.length && event.target?.files !== undefined) {
        const file = event.target.files[0];
        formikProps.setFieldValue(path, file); // Stocăm fișierul
      } else if (event.target?.value !== undefined) {
        formikProps.setFieldValue(path, event.target.value);
      }
    },
    error:
      getValueFromObj(formikProps.touched, path) &&
      Boolean(getValueFromObj(formikProps.errors, path))
        ? (getValueFromObj(formikProps.errors, path) as any)
        : undefined,
    disabled: formikProps.isSubmitting,
  };
};
