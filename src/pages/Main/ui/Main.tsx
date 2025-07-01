import {type Post} from '../../../shared/api'
import { AddPost } from '../../../features/AddPost'
import { useFetch } from '../../../hooks/useFetch'
import { fetchAllPosts } from '../../../shared/api'
import { PostList } from '../../../widgets/PostList/ui'



export const Main: React.FC = () => {
    const {data: posts, isLoading} = useFetch<Post[]>(fetchAllPosts)

    return (
        <>
        
            <AddPost/>
            <PostList posts={posts}/>
        </>
    )
}
