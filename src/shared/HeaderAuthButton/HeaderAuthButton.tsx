import styles from './headerAuthButton.module.scss'

interface HeaderAuthButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'login' | 'register';
}

export const HeaderAuthButton: React.FC<HeaderAuthButtonProps> = ({ children, onClick, variant }) => {
    const classNames = [styles['header-auth-button']];
    if (variant) {
        classNames.push(styles[variant]);
    }

    return (<button type="button" className={classNames.join(' ')} onClick={onClick}>
        {children} </button>
    );
};
