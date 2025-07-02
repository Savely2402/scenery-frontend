import styles from './errorPage.module.scss'
import Logo from '../../../assets/Logo.svg'
import { Link } from 'react-router'
import { Button } from 'antd'


export const ErrorPage: React.FC = () => {
    return (
        <div className={styles['error-container']}>
            <div className={styles['login-logo']}>
                <img src={Logo} alt="Logo" />
            </div>
            <div className={styles['not-found-box']}>
                <h1 className={styles['not-found-title']}>404</h1>
                <div className={styles['not-found-text']}>
                    Sorry, we were unable to find that page
                </div>
                <div className={styles['not-found-button']}>
                    <Link to="/home">
                        <Button
                            type="primary"
                            block
                            size="large"
                            className={styles['error-button']}
                        >
                            На главную</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
