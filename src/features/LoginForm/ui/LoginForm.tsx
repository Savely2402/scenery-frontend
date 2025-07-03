import { Button } from 'antd'
import styles from './loginForm.module.scss'

import { useForm, type SubmitHandler } from 'react-hook-form'

import { fetchAuthMe, loginUser, type LoginFormData } from '../../../shared/api'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import { setAccessToken, setRefreshToken } from '../../../utils/token'
import { useAuth } from '../../../hooks/useAuth'
import { EmailField, PasswordField } from '../../../shared/ui'

export const LoginForm: React.FC = () => {
    const { setUser } = useAuth()

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginFormData>()

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<LoginFormData> = async (loginFormData) => {
        try {
            const user = await loginUser(loginFormData)

            if (user) {
                setAccessToken(user.access)
                setRefreshToken(user.refresh)
                const userData = await fetchAuthMe()
                console.log(userData)
                setUser(userData)
                navigate('/home')
            }
        } catch (err) {
            console.error(err)
            throw new Error('Login submit error')
        }
    }

    return (
        <div className={styles['login-container']}>
            <div className={styles['login-logo']}>
                <img src="src/assets/Logo.svg" alt="Logo" />
            </div>

            <form
                className={styles['login-form']}
                onSubmit={handleSubmit(onSubmit)}
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

                <EmailField control={control} />

                <div className={styles['login-form-errors']}>
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <PasswordField control={control} />

                <div className={styles['login-form-errors']}>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <div className={styles['forgot-password']}>
                    <Link to="/"> Forget Password?</Link>
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
                    LinDon’t have an account?{' '}
                    <Link to="/register"> Sign up</Link>
                </div>
            </form>
        </div>
    )
}
