import { AddPost } from '../../../features/AddPost'
import { useFetch } from '../../../hooks/useFetch'
import { fetchAllPosts } from '../../../shared/api'
import { PostItem } from '../../../widgets/PostItem'

export const Main: React.FC = () => {
    const { data, error, isLoading } = useFetch(fetchAllPosts)

    return (
        <>
            <AddPost />
            {data?.map((post) => (
                <PostItem post={post} />
            ))}
        </>
    )
}
