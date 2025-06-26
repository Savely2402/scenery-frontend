import { AuthButton } from '../../shared/AuthButton'
import { AuthInput } from '../../shared/AuthInput'

import {
    useForm,
    type SubmitErrorHandler,
    type SubmitHandler,
} from 'react-hook-form'
import type { LoginFormData } from '../types/forms'

export const LoginForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>()

    const onSubmit = async (data: LoginFormData) => {
        console.log(data)
    }

    return (
        <>
            <div>Login Form</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AuthInput
                    type="email"
                    placeholder="email@gmail.com"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid Email address',
                        },
                    })}
                />

                <AuthInput
                    type="password"
                    placeholder="Enter your password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message:
                                'The password must consist of at least 6 characters and no more than 18 characters.',
                        },
                        maxLength: {
                            value: 18,
                            message:
                                'The password must consist of at least 6 characters and no more than 18 characters.',
                        },
                    })}
                />
                <AuthButton>Login</AuthButton>
            </form>
            {errors.email && <p>{errors.email.message}</p>}
            {errors.password && <p>{errors.password.message}</p>}
        </>
    )
}
