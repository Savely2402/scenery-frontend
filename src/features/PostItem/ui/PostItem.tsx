import { Card, Typography, Image, Button, Divider } from 'antd';
import LikeIcon from '../../../assets/Like.svg?react'
import CommentIcon from '../../../assets/Comment.svg?react'
import  styles  from './postItem.module.scss'
import { useState } from 'react';
import { CommentList } from '../../../widgets/CommentList/ui';
import type { Comment } from '../../../widgets/types/comment';
import avatar from '../../../assets/avatarMan.png'
import { CommentInput } from '../../CommentInput/ui/CommentInput';
import { UserCard } from '../../../shared/UserCard/ui';
import { PostActions } from '../../PostActions';
import {type Post} from '../../../shared/api'

const { Text } = Typography;

interface ItemProps{
    post: Post;
}

export const PostItem: React.FC<ItemProps> = ({ post }) => {

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<Comment[]>([])

    const user =  {
        id: 12,
        email: 'mail@mail.com',
        userAgent: 'test',
        access: 'test',
        refresh: 'test'
      }

    const handleCommentSubmit = (text: string) => {
    const newComment: Comment = {
        id: Number(Date.now()),
        author: {
            id: 1,
            name: 'Qwerty',
            job: 'Worker',
            avatar,
        },
        content: text,
    }
    setComments((prev) => [...prev, newComment])
    }

    return (
        <Card
            style={{width: 582, margin: 16}} >
            <div className={styles.headBlock}>
                <UserCard author={ post.author }/>
                <PostActions userID={user.id} post = {post} />
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div style={{marginTop: 16}}>
                <Text className={styles.content}>{post.description}</Text>
            </div>
            {/* {post.image_url && (
                <Image src={post.image_url} width='486' style={{marginTop: 16}}/>
            )} */}
            <div className={styles.socialConteiner}>
                <Button 
                    type='text' 
                    icon={<CommentIcon className={styles.commentIcon}/>} 
                    className={styles.commentIcon}
                    onClick={() => setShowComments((prev) => !prev)}
                    >Comment</Button>
                <Button type='text' icon={<LikeIcon className={styles.likeIcon}/>} />
            </div>
            {showComments && (
                <div>
                    <CommentInput avatar={post.author.avatar} onSubmit={handleCommentSubmit}/>
                    <CommentList comments={comments} postAuthorID={post.author.id}/>
                </div>
                )}
        </Card>
    )
}