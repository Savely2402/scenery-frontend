import { Button, Dropdown, Typography, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import MoreIcon from '../../../assets/More.svg?react'
import { type Post } from '../../../shared/api'
import styles from './postActions.module.scss'
import { deletePost } from '../../../shared/api'

const { Text } = Typography

interface PostActionsProps {
    userID: number | undefined
    post: Post
}

export const PostActions: React.FC<PostActionsProps> = ({ userID, post }) => {
    const isAuthor = userID === post.

    console.log([userID, post.author.id])

    if (!isAuthor) return null

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
        <Space align="end" direction="vertical" size={0}>
            {isAuthor && (
                <Dropdown
                    menu={{ items: menuItems }}
                    trigger={['click']}
                    placement="bottomRight"
                >
                    <Button icon={<MoreIcon />} type="text" />
                </Dropdown>
            )}
            <Text className={styles.date}>7 hours ago</Text>
        </Space>
    )
}
