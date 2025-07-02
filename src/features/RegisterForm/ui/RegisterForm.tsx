import { Input, Button } from 'antd'
import styles from './registerForm.module.scss'
import {
    useForm,
    type SubmitErrorHandler,
    type SubmitHandler,
} from 'react-hook-form'
import type { RegisterFormData } from '../../../types/forms'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import { registerUser } from '../../../shared/api'
import { setAccessToken, setRefreshToken } from '../../../utils/token'

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
        console.log(registerFormData)
        try {
            const user = await registerUser(registerFormData)

            if (user) {
                setAccessToken(user.access)
                setRefreshToken(user.refresh)
                navigate('/home')
            }
        } catch (err) {
            console.error(err)
            throw new Error('Login submit error')
        }
    }

    const error: SubmitErrorHandler<RegisterFormData> = (data) => {
        console.log(data)
    }

    const passwordValue = watch('password')

    return (
        <>
            <div className={styles['login-container']}>
                <div className={styles['login-logo']}>
                    <img src="src/assets/Logo.svg" alt="Logo" />
                </div>

                <form
                    className={styles['login-form']}
                    onSubmit={handleSubmit(onSubmit, error)}
                >
                    <button type="button" className={styles['social-button']}>
                        <img src="src/assets/Google.svg" alt="Google" />
                        Log in with Google
                    </button>

                    <button type="button" className={styles['social-button']}>
                        <img src="src/assets/Email.svg" alt="Email" />
                        Log in with Email
                    </button>

                    <div className={styles['divider']}>
                        <span>OR</span>
                    </div>

                    <input
                        // size="large"
                        defaultValue={'user'}
                        type="text"
                        placeholder="Enter your username"
                        {...register('username', {
                            required: 'Username is required',
                            pattern: {
                                value: /^[A-Za-z0-9]+$/,
                                message:
                                    'Only Latin letters and numbers are allowed',
                            },
                        })}
                    />

                    <div className={styles['login-form-errors']}>
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>

                    <input
                        // size="large"
                        type="email"
                        defaultValue={'mail@gmail.com'}
                        placeholder="email@gmail.com"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid Email address',
                            },
                        })}
                    />

                    <div className={styles['login-form-errors']}>
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>

                    <input
                        // size="large"
                        defaultValue={'12345678'}
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

                    <div className={styles['login-form-errors']}>
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <input
                        // size="large"
                        type="password"
                        defaultValue={'12345678'}
                        placeholder="Confirm your password"
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) =>
                                value === passwordValue ||
                                'Passwords do not match',
                        })}
                    />

                    <div className={styles['login-form-errors']}>
                        {errors.confirmPassword && (
                            <p>{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <Button
                        type="primary"
                        block
                        size="large"
                        htmlType="submit"
                        className={styles['login-button']}
                    >
                        Continue
                    </Button>

                    <div className={styles['signup-link']}>
                        Have an account? <Link to="/Login"> Log in </Link>
                    </div>
                </form>
            </div>
        </>
    )
}
