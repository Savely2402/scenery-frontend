import styles from './settingsLayout.module.scss'
import { Outlet, Link, useLocation } from 'react-router'

export const SettingsLayout: React.FC = () => {
    const location = useLocation()

    return (
        <><div className={styles['settings-title']}>Settings</div>
            <div className={styles['settings-container']}>
                <aside className={styles['sidebar']}>
                    <ul>
                        <li>
                            <Link
                                to="/profile/settings"
                                className={location.pathname === '/profile/settings' ? styles.active : ''}
                            >
                                General
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile/settings/account"
                                className={location.pathname === '/profile/settings/account' ? styles.active : ''}
                            >
                                Account
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile/settings/logout"
                                className={location.pathname === '/profile/settings/logout' ? styles.active : ''}
                            >
                                Logout
                            </Link>
                        </li>
                    </ul>
                </aside>
                <main className={styles['content']}>
                    <Outlet />
                </main>
            </div>
        </>
    )
}
