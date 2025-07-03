import type React from 'react'
import { Controller } from 'react-hook-form'
import type { FormFieldProps } from '../../api'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Input } from 'antd'

type ConfirmPasswordProps = {
    passwordValue: string
}

export const PasswordField: React.FC<FormFieldProps> = ({ control }) => {
    return (
        <Controller
            name="password"
            control={control}
            rules={{
                required: 'Password is required',
                minLength: {
                    value: 6,
                    message: 'Password must be 6-18 characters long.',
                },
                maxLength: {
                    value: 18,
                    message: 'Password must be 6-18 characters long.',
                },
            }}
            render={({ field }) => (
                <Input.Password
                    size="large"
                    type="password"
                    placeholder="Password"
                    iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    {...field}
                />
            )}
        />
    )
}

export const ConfirmPasswordField: React.FC<
    FormFieldProps<ConfirmPasswordProps>
> = ({ control, passwordValue }) => {
    return (
        <Controller
            name="password"
            control={control}
            rules={{
                required: 'Please confirm your password',
                validate: (value) =>
                    value === passwordValue || 'Passwords do not match',
            }}
            render={({ field }) => (
                <Input.Password
                    size="large"
                    type="password"
                    placeholder="Confirm password"
                    iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    {...field}
                />
            )}
        />
    )
}
