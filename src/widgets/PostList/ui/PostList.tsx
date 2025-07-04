import type { Post } from '../../../shared/api'
import { Space } from 'antd'
import { PostItem } from '../../../features/PostItem'
import styles from './postList.module.scss'

interface PostListProps {
    posts: Post[] | null
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
    return (
        <div className={styles.container}>
            <Space direction="vertical">
                {posts &&
                    posts.map((post) => <PostItem key={post.id} post={post} />)}
            </Space>
        </div>
    )
}
