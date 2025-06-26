import { AuthButton } from '../../shared/AuthButton'
import { AuthInput } from '../../shared/AuthInput'

export const RegisterForm: React.FC = () => {
    return (
        <>
            <div>Register form</div>
            <form>
                <AuthInput type="text" placeholder="Enter your username" />
                <AuthInput type="email" placeholder="email@gmail.com" />
                <AuthInput type="password" placeholder="Enter your password" />
                <AuthInput
                    type="password"
                    placeholder="Confirm your password"
                />
                <AuthButton>Регистрация</AuthButton>
            </form>
        </>
    )
}
