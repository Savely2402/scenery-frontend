import React, { useState } from 'react'
import styles from './generalSettings.module.scss'
import { Upload, Input, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const { TextArea } = Input

export const GeneralSettings: React.FC = () => {
    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')

    const handleSave = () => {
        message.success('Settings saved!')
        console.log({ fullName, username, bio })
    }

    return (
        <div className={styles['settings-form']}>
            <div className={styles['upload-button']}>
                <Upload>
                    <Button icon={<UploadOutlined />}>Choose an image for avatar</Button>
                </Upload>
            </div>

            <div className={styles['input-field']}>
                <Input
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>

            <div className={styles['input-field']}>
                <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className={styles['input-field']}>
                <TextArea
                    placeholder="Bio"
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </div>

            <Button
                className={styles['save-button']}
                type="primary"
                onClick={handleSave}
            >
                Save Changes
            </Button>
        </div>
    )
}
