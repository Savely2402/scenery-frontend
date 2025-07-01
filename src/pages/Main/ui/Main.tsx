import styles from './main.module.scss'
import { Header } from '../../../widgets/Header/ui'
import { Navigation } from '../../../widgets/Navigation/ui'

export const Main: React.FC = () => {
    return (
        <div className={styles.container}>
            <Header />
            <Navigation />
        </div>
    )
}
