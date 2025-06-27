import { AuthButton } from '../../shared/AuthButton'
import { Input } from '../../shared/Input'

import { useForm, type SubmitErrorHandler, type SubmitHandler } from 'react-hook-form'

import type { RegisterFormData } from '../types/forms'

export const RegisterForm: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();

    const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
        console.log(data);
    }

    const error: SubmitErrorHandler<RegisterFormData> = (data) => {
        console.log(data);
    }

    const passwordValue = watch('password')

    return (
        <>
            <div>Register form</div>
            <form onSubmit={handleSubmit(onSubmit, error)}>
                <Input sizeVariant='L' type="text" placeholder="Enter your username"
                    {...register('username', {
                        required: 'Username is required', pattern: {
                            value: /^[A-Za-z0-9]+$/,
                            message: 'Only Latin letters and numbers are allowed'
                        }
                    })} />
                <Input sizeVariant='L' type="email" placeholder="email@gmail.com"
                    {...register('email', {
                        required: 'Email is required', pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid Email address'
                        }
                    })} />
                <Input sizeVariant='L' type="password" placeholder="Enter your password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'The password must consist of at least 6 characters and no more than 18 characters.'
                        },
                        maxLength: {
                            value: 18,
                            message: 'The password must consist of at least 6 characters and no more than 18 characters.'
                        }
                    })} />
                <Input sizeVariant='L'
                    type="password"
                    placeholder="Confirm your password"
                    {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) => value === passwordValue || 'Passwords do not match',
                    })}
                />
                <AuthButton>Регистрация</AuthButton>
                {errors.email && <p>{errors.email.message}</p>}
                {errors.username && <p>{errors.username.message}</p>}
                {errors.password && <p>{errors.password.message}</p>}
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </form>
        </>
    )
}
