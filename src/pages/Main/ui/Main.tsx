import { AddPost } from '../../../features/AddPost'
import { PostList } from '../../../widgets/PostList'
import { usePosts } from '../../../hooks/usePosts'

export const Main: React.FC = () => {
    const { posts } = usePosts()

    console.log(posts)

    return (
        <>
            <AddPost />
            <PostList posts={posts} />
        </>
    )
}
