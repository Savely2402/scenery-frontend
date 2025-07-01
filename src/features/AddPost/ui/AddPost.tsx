import React, { useState, useContext } from 'react';
import { Input, Button } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import avatar from '../../../assets/avatarMan.png';
import styles from './addPost.module.scss';
import { AuthContext } from '../../../contexts/AuthContext';

const { TextArea } = Input;

export const AddPost: React.FC = () => {
    const [value, setValue] = useState('');
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    return (
        <div className={styles['container']}>
            <div className={styles['add-post-container']}>
                <img
                    src={user?.avatar || avatar}
                    alt="avatar"
                    className={styles['avatar']}
                />

                <div className={styles['input-section']}>
                    <div className={styles['text-area-wrapper']}>

                        <TextArea
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            variant="underlined"
                            placeholder="What's on your mind?"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                    </div>

                    <div className={styles['add-photo']}>
                        <Button icon={<PictureOutlined />} className={styles['add-media-button']}>
                            Add Media
                        </Button>

                        <Button
                            type="primary"
                            shape="round"
                            className={styles['post-button']}
                        >
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
