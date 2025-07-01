import { CommentItem } from "../../../features/CommentItem/ui"
import type { Comment } from "../../api/comment" 
import styles from './commentReplyList.module.scss'

interface CommentReplyListProps {
    replies: Comment[]
    postAuthorID: number
}

export const CommentReplyList:React.FC<CommentReplyListProps> = ({replies, postAuthorID}) => {
    if (replies.length === 0) return null;
    return(
        <div>
            <div className={styles.replyChildren}>
                {replies.map((reply)=>(
                    <CommentItem comment={reply}  postAuthorID={postAuthorID}/>
                ))}
            </div> 
        </div>
    )
}