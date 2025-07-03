import type { Control, ControllerProps, FieldValues } from 'react-hook-form'

export type FormFieldProps<ExtraProps = object> = {
    control: Control<any>
} & ExtraProps

export type LoginFormData = {
    email: string
    password: string
} & FieldValues

export type RegisterFormData = {
    email: string
    username: string
    password: string
    confirmPassword: string
} & FieldValues
