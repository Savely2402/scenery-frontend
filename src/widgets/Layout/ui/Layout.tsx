import { Outlet } from 'react-router'
import { Header, Navigation } from '../../../shared/ui'
import styles from './layout.module.scss'

export const Layout = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.layout__content}>
                <Navigation />
                <Outlet />
            </div>
        </div>
    )
}
