import styles from './errorPage.module.scss'
import { Link } from 'react-router';
import { AuthButton } from '../../shared/AuthButton'

export const ErrorPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles['not-found-box']}>
                <h1 className={styles['not-found-title']}>
                    404
                </h1>
                <div className={styles['not-found-text']}>
                    Sorry, we were unable to find that page
                </div>
                <div className={styles['not-found-button']}>
                    <Link to="/home">
                        <AuthButton> На главную</AuthButton>
                    </Link>
                </div>
            </div>
        </div>

    )
}
