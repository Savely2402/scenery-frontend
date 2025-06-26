import styles from './authLayout.module.scss'
import { Outlet } from 'react-router'

export const AuthLayout: React.FC = () => {
    return (
        <div className={styles.authLayout}>
            <Outlet />
        </div>
    )
}
