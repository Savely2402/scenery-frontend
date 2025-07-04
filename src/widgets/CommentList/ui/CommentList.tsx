import { Space } from 'antd'
import { CommentItem } from '../../../features/CommentItem/'
import { type Comment } from '../../../shared/api'

interface CommentListProps {
    comments: Comment[]
    postAuthorID: number
}

export const CommentList: React.FC<CommentListProps> = ({
    comments,
    postAuthorID,
}) => {
    return (
        <Space style={{ marginTop: 16 }} direction="vertical" size={0}>
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    postAuthorID={postAuthorID}
                />
            ))}
        </Space>
    )
}
