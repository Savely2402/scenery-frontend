import styles from './main.module.scss'
import { Header } from '../../widgets/Header'
import { TopSection } from '../../widgets/TopSection'


export const Main: React.FC = () => {

    return (
        <div className={styles.container}>
            <Header />
            <TopSection />
        </div>
    )
}
