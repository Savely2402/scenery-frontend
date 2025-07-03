import {
    Card,
    Avatar,
    Typography,
    Space,
    Image,
    Button,
    Dropdown,
    Menu,
    Divider,
} from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import LikeIcon from '../../../assets/Like.svg?react'
import CommentIcon from '../../../assets/Comment.svg?react'
import MoreIcon from '../../../assets/More.svg?react'
import styles from './postItem.module.scss'
import { type Post, deletePost } from '../../../shared/api'

const { Text } = Typography

interface ItemProps {
    post: Post
}

export const PostItem: React.FC<ItemProps> = ({ post }) => {
    const menuItems = [
        {
            key: 'edit',
            label: 'Edit Post',
            icon: <EditOutlined />,
        },
        {
            key: 'delete',
            label: 'Delete Post',
            danger: true,
            icon: <DeleteOutlined />,
            onclick: async () => {
                await deletePost({ post_id: post.id })
            },
        },
    ]

    return (
        <Card style={{ width: 582, margin: 16 }}>
            <div className={styles.headBlock}>
                <Space align="start">
                    <Avatar
                        src={post.author.avatar}
                        className={styles.avatar}
                    />
                    <Space direction="vertical" size={0}>
                        <Text strong className={styles.title}>
                            {post.author.email}
                        </Text>
                        <Text className={styles.job}>{post.author.email}</Text>
                    </Space>
                </Space>
                <Space align="end" direction="vertical" size={0}>
                    <Dropdown
                        menu={{ items: menuItems }}
                        trigger={['click']}
                        placement="bottomRight"
                    >
                        <Button icon={<MoreIcon />} type="text" />
                    </Dropdown>
                    <Text className={styles.date}>7 hours ago</Text>
                </Space>
            </div>

            <Divider style={{ margin: '12px 0' }} />

            <div style={{ marginTop: 16 }}>
                <Text className={styles.content}>{post.description}</Text>
            </div>
            {post.image_url && (
                <Image
                    src={post.image_url}
                    width="486"
                    style={{ marginTop: 16 }}
                />
            )}
            <div className={styles.socialConteiner}>
                <Button
                    type="text"
                    icon={<CommentIcon className={styles.commentIcon} />}
                    className={styles.commentIcon}
                >
                    Comment
                </Button>
                <Button
                    type="text"
                    icon={<LikeIcon className={styles.likeIcon} />}
                />
            </div>
        </Card>
    )
}
