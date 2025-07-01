import styles from './main.module.scss'
import { Header } from '../../../widgets/Header/ui'
import { Navigation } from '../../../widgets/Navigation/ui'
import { AddPost } from '../../../features/AddPost/ui'
import { useFetch } from '../../../hooks/useFetch'
import { fetchAllPosts } from '../../../api/fetchPost'
import { PostItem } from '../../../widgets/PostItem/ui'

export const Main: React.FC = () => {
    const { data, error, isLoading } = useFetch(fetchAllPosts)

    return (
        <div className={styles.container}>
            <Header />
            <AddPost />
            {data.map((post) => (
                <PostItem post={post} />
            ))}
            <Navigation />
        </div>
    )
}
