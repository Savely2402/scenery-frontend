import { Button } from 'antd'
import styles from './registerForm.module.scss'
import {
    useForm,
    type SubmitErrorHandler,
    type SubmitHandler,
} from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import {
    fetchAuthMe,
    registerUser,
    type RegisterFormData,
} from '../../../shared/api'
import { setAccessToken, setRefreshToken } from '../../../utils/token'
import { useAuth } from '../../../hooks/useAuth'
import {
    ConfirmPasswordField,
    EmailField,
    PasswordField,
    UsernameField,
} from '../../../shared/ui'
import GoogleIcon from '../../../assets/Google.svg?react'
import EmailIcon from '../../../assets/Email.svg?react'

export const RegisterForm: React.FC = () => {
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>()

    const { setUser } = useAuth()

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<RegisterFormData> = async (
        registerFormData: RegisterFormData
    ) => {
        try {
            const user = await registerUser(registerFormData)

            if (user) {
                setAccessToken(user.access)
                setRefreshToken(user.refresh)

                const userData = await fetchAuthMe()
                setUser(userData)

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
                    <Button
                        type="default"
                        className={styles['social-button']}
                        icon={<GoogleIcon />}
                    >
                        Log in with Google
                    </Button>

                    <Button
                        type="default"
                        className={styles['social-button']}
                        icon={<EmailIcon />}
                    >
                        Log in with Email
                    </Button>

                    <div className={styles['divider']}>
                        <span>OR</span>
                    </div>

                    <UsernameField control={control} />

                    <div className={styles['login-form-errors']}>
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>

                    <EmailField control={control} />

                    <div className={styles['login-form-errors']}>
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>

                    <PasswordField control={control} />

                    <div className={styles['login-form-errors']}>
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <ConfirmPasswordField
                        control={control}
                        passwordValue={passwordValue}
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
