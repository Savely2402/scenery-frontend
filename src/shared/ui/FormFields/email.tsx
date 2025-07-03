import { Input } from 'antd'
import { Controller } from 'react-hook-form'
import type { FormFieldProps } from '../../api/'

export const EmailField: React.FC<FormFieldProps> = ({ control }) => {
    return (
        <Controller
            name="email"
            control={control}
            rules={{
                required: 'Email is required',
                pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid Email address',
                },
            }}
            render={({ field }) => (
                <Input
                    size="large"
                    type="email"
                    placeholder="Email"
                    {...field}
                />
            )}
        />
    )
}
