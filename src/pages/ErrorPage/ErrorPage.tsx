import styles from './errorPage.module.scss'
import { Link } from 'react-router';
import { AuthButton } from '../../shared/AuthButton'

export const ErrorPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.notFoundBox}>
                <h1 className={styles.notFoundTitle}>
                    404
                </h1>
                <div className={styles.notFoundText}>
                    Sorry, we were unable to find that page
                </div>
                <div className={styles.notFoundButto}>
                    <Link to="/home">
                        <AuthButton> На главную</AuthButton>
                    </Link>
                </div>
            </div>
        </div>

    )
}
