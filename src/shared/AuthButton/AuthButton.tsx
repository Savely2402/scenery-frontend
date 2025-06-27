import styles from './authButton.module.scss'

interface AuthButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ children, onClick }) => {
    return <button type="submit" className={styles['auth-button']} onClick={onClick}>
        {children} </button>
}






