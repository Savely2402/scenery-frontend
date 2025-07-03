import { Button } from 'antd'
import styles from './accountSettings.module.scss'

export const AccountSettings: React.FC = () => {

    return (

        <div className={styles['acount-settings__container']}>
            <div className={styles['acount-settings__title']}>
                Delete Account
            </div>

            <div className={styles['acount-settings__text']}>
                This action is irreversible and will permanently delete all your data associated with the account.
            </div>

            <Button
                className={styles['acount-settings__button']}
            >
                Delete My Account
            </Button>
        </div>

    )
}