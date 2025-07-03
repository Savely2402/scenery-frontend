import type React from 'react'
import { Controller } from 'react-hook-form'
import type { FormFieldProps } from '../../api'
import { Input } from 'antd'

export const UsernameField: React.FC<FormFieldProps> = ({ control }) => {
    return (
        <Controller
            name="username"
            control={control}
            rules={{
                required: 'Username is required',
                pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: 'Only Latin letters and numbers are allowed',
                },
            }}
            render={({ field }) => (
                <Input
                    size="large"
                    type="text"
                    placeholder="Enter your username"
                    {...field}
                />
            )}
        />
    )
}
