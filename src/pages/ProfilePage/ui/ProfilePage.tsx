import styles from './profilePage.module.scss'
import { Header } from '../../../widgets/Header/ui'
import { Navigation } from '../../../widgets/Navigation/ui'
import { ProfileHeader } from '../../../widgets/ProfileHeader/ui'

export const ProfilePage: React.FC = () => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <Navigation />
                <ProfileHeader />
            </div>
        </div>
    )
}
