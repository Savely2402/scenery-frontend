import { Input, Button } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import styles from './loginForm.module.scss'

import {
    useForm,
    type SubmitErrorHandler,
    type SubmitHandler,
} from 'react-hook-form'

import type { LoginFormData } from '../../../types/forms'
import { fetchAuthLogin } from '../../../api/fetchAuth'
import { useNavigate } from 'react-router'
import { setCookie } from '../../../utils/cookies'
import { Link } from 'react-router'

export const LoginForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>()

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<LoginFormData> = async (loginFormData) => {
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
        <div className={styles['login-container']}>
            <div className={styles['login-logo']}>
                <img src='src/assets/Logo.svg' alt="Logo" />
            </div>

            <form className={styles['login-form']} onSubmit={handleSubmit(onSubmit)}>
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

                <Input
                    size="large"
                    type="email"
                    placeholder="Email"
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

                <Input.Password
                    size="large"
                    placeholder="Password"
                    iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message:
                                'Password must be 6-18 characters long.',
                        },
                        maxLength: {
                            value: 18,
                            message:
                                'Password must be 6-18 characters long.',
                        },
                    })}
                />
                <div className={styles['login-form-errors']}>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <div className={styles['forgot-password']}>
                    <Link to='/'> Forget Password?</Link>
                </div>

                <Button
                    type="primary"
                    block
                    size="large"
                    htmlType="submit"
                    className={styles['login-button']}
                >
                    Log in

                </Button>

                <div className={styles['signup-link']}>
                    LinDon’t have an account? <Link to='/register'> Sign up</Link>
                </div>
            </form>
        </div>
    )
}
