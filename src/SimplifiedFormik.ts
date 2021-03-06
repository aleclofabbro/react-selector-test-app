import { FormikErrors, FormikTouched } from 'formik'
import { ChangeEvent, FormEvent } from 'react'

export interface SimplifiedFormik<Values = {}> {
  initialValues: Values
  handleBlur: (eventOrString: any) => void | ((e: any) => void)
  handleChange: (
    eventOrPath: string | ChangeEvent<any>,
  ) => void | ((eventOrTextValue: string | ChangeEvent<any>) => void)
  handleReset: (e: any) => void
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void
  submitForm: () => unknown
  setFieldValue: <K extends keyof Values>(field: K, value: Values[K], shouldValidate?: boolean | undefined) => any

  isValid: boolean
  dirty: boolean
  values: Values

  errors: FormikErrors<Values>
  touched: FormikTouched<Values>
  isSubmitting: boolean
  isValidating: boolean
  submitCount: number
}
