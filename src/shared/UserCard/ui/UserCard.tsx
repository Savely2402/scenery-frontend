import {Space, Avatar, Typography} from 'antd'
import { type User } from '../../api'
import styles from './userCard.module.scss'

const { Text } = Typography

interface AvatarItem{
    author: User
}

export const UserCard:React.FC<AvatarItem> = ({author}) =>{
    return(
        <Space align='start'>
            <Avatar src={author.avatar}  className={styles.avatar}/>
            <Space direction='vertical' size={0}>  
                <Text strong className={styles.title}>{author.username}</Text>
                {/* <Text className={styles.job}>{author.job}</Text> */}
            </Space>
        </Space>
    )
}