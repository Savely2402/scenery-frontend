import styles from './main.module.scss'
import { Header } from '../../../widgets/Header/ui'
import { TopSection } from '../../../widgets/TopSection/ui'
import { Navigation } from '../../../widgets/Navigation/ui'

export const Main: React.FC = () => {
    return (
        <div className={styles.container}>
            <Header />
            <TopSection />

            <Navigation />
        </div>
    )
}
