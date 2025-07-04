import { Card, Button, Typography } from 'antd'
import type { Comment } from '../../../shared/api/comment'
import { CommentInput } from '../../CommentInput/'
import styles from './commentItem.module.scss'
import { useState } from 'react'
import { CommentActions } from '../../CommentActions'
import { CommentReplyList } from '../../../shared/ui/'
import { UserCard } from '../../../shared/ui/'

const { Text } = Typography

interface CommentProps {
    comment: Comment
    postAuthorID: number
}

export const CommentItem: React.FC<CommentProps> = ({
    comment,
    postAuthorID,
}) => {
    const user = {
        id: 12,
        email: 'mail@mail.com',
        userAgent: 'test',
        access: 'test',
        refresh: 'test',
    }

    const [replies, setReplies] = useState<Comment[]>([])
    const [showReplyInput, setShowReplyInput] = useState(false)

    const replySubmit = (text: string) => {
        // const newReply: Comment = {
        //     id: Number(Date.now()),
        //     author:{
        //         id: user.id,
        //         name: 'qwerrr',
        //         job: 'qweff',
        //         avatar: comment.author.avatar
        //     },
        //     content: text,
        // }
        // setReplies((prev)=>[...prev, newReply]);
        // setShowReplyInput(false)
    }

    return (
        <></>
        // <>
        //     <Card
        //         className={styles.commentCard}>
        //         <div className={styles.headBlock}>
        //             <UserCard author={comment.author}/>
        //             <CommentActions userID={user.id} comment={comment} postAuthorID={postAuthorID}/>
        //         </div>
        //         <div style={{marginTop: 16}}>
        //             <Text className={styles.content}>{comment.content}</Text>
        //         </div>

        //         <div className={styles.replyButton}>
        //             <Button type="text"
        //                 onClick={() => setShowReplyInput((prev) => !prev)}
        //             >Reply</Button>
        //         </div>
        //         {showReplyInput && (
        //             <div >
        //                 <CommentInput avatar={comment.author.avatar} onSubmit={replySubmit} />
        //             </div>
        //         )}
        //     </Card>
        //     <CommentReplyList replies={replies} postAuthorID={postAuthorID} />
        // </>
    )
}
