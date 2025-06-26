import { HeaderAuthButton } from '../../shared/HeaderAuthButton/HeaderAuthButton';
import styles from './header.module.scss'
import { Link } from 'react-router';

export const Header: React.FC = () => {

    return (
        <div className={styles.header}>
            <Link to="/login">
                <HeaderAuthButton variant="login">
                    Войти
                </HeaderAuthButton>
            </Link>
            <Link to="/register">
                <HeaderAuthButton variant="register">
                    Регистрация
                </HeaderAuthButton>
            </Link>
        </div>
    )
}
