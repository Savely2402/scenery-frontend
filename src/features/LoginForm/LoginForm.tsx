import { AuthButton } from '../../shared/AuthButton'
import { Input } from '../../shared/Input'

import {
    useForm,
    type SubmitErrorHandler,
    type SubmitHandler,
} from 'react-hook-form'
import type { LoginFormData } from '../types/forms'
import { fetchAuthLogin } from '../../api/fetchAuth'
import { useNavigate } from 'react-router'
import { setCookie } from '../../utils/cookies'

export const LoginForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>()

    const navigate = useNavigate()

    const onSubmit = async (loginFormData: LoginFormData) => {
        const user = await fetchAuthLogin(loginFormData)

        if (user) {
            setCookie('token', user.access, {
                expires: new Date(Date.now() + 5 * 60 * 1000),
            })
            setCookie('refresh', user.refresh, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            })
            navigate('/home')
        }
    }

    return (
        <>
            <div>Login Form</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input sizeVariant='L'
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

                <Input sizeVariant='L'
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
