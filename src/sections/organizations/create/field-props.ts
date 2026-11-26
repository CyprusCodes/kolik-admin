import type { FormikProps } from "formik";

export const fieldProps = <T extends object>(formik: FormikProps<T>, name: keyof T & string) => {
  const touched = formik.touched[name];
  const error = touched ? (formik.errors[name] as string | undefined) : undefined;

  return {
    name,
    value: (formik.values[name] ?? "") as unknown,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    error: Boolean(error),
    helperText: error,
  };
};
