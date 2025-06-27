import { AuthButton } from '../../shared/AuthButton'
import { Input } from '../../shared/Input'
import styles from './registerForm.module.scss'

import {
    useForm,
    type SubmitErrorHandler,
    type SubmitHandler,
} from 'react-hook-form'

import type { RegisterFormData } from '../types/forms'
import { fetchAuthRegister } from '../../api/fetchAuth'
import { setCookie } from '../../utils/cookies'
import { useNavigate } from 'react-router'

export const RegisterForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>()

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<RegisterFormData> = async (
        registerFormData: RegisterFormData
    ) => {
        const user = await fetchAuthRegister(registerFormData)

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

    const error: SubmitErrorHandler<RegisterFormData> = (data) => {
        console.log(data)
    }

    const passwordValue = watch('password')

    return (
        <>
            <div className={styles.container}>
                <div className={styles['login-form-title']}
                >
                    Register form
                </div>
                <form className={styles['login-form']} onSubmit={handleSubmit(onSubmit, error)}>
                    <Input sizeVariant='L' type="text" placeholder="Enter your username"
                        {...register('username', {
                            required: 'Username is required', pattern: {
                                value: /^[A-Za-z0-9]+$/,
                                message: 'Only Latin letters and numbers are allowed'
                            }
                        })} />

                    <div className={styles['login-form-errors']}>
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>

                    <Input sizeVariant='L' type="email" placeholder="email@gmail.com"
                        {...register('email', {
                            required: 'Email is required', pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid Email address'
                            }
                        })} />

                    <div className={styles['login-form-errors']}>
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>

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

                    <div className={styles['login-form-errors']}>
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <Input sizeVariant='L'
                        type="password"
                        placeholder="Confirm your password"
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) => value === passwordValue || 'Passwords do not match',
                        })}
                    />

                    <div className={styles['login-form-errors']}>
                        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                    </div>

                    <AuthButton>Регистрация</AuthButton>
                </form>
            </div>
        </>
    )
}
