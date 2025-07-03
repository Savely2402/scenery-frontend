import {Button, Dropdown, Typography, Space} from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import MoreIcon from '../../../assets/More.svg?react'
import type { Comment } from '../../../widgets/types/comment'

import styles from './commentActions.module.scss'

interface CommentMenuProps {
  userID: number
  comment: Comment
  postAuthorID: number
}

const { Text } = Typography

export const CommentActions:React.FC<CommentMenuProps> = ({ userID, comment, postAuthorID }) =>{
    const isAuthor = userID === comment.author.id
    const isPostOwner = userID === postAuthorID

    const menuItems = [
        ...(isAuthor?[{
            key: 'edit',
            label: 'Edit comment',
            icon: <EditOutlined />,
         }] : []),
        ...(isAuthor || isPostOwner?[{
            key: 'delete',
            label: 'Delete comment',
            danger: true,
            icon: <DeleteOutlined />,
        }] : []),
        ]

    return(
        <Space align='end' direction='vertical' size={0}>
                {menuItems.length > 0 && (
                    <Dropdown  menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
                        <Button icon={<MoreIcon />} type="text" />
                    </Dropdown>
                )}
                    
                <Text className={styles.date}>7 hours ago</Text>
            </Space>
        
    )
} 