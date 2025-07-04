import React, { useState, useEffect } from 'react'
import { Modal, Input, Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { Post } from '../../../shared/api'
import styles from './editPost.module.scss'

const { TextArea } = Input

interface EditPostModalProps {
    visible: boolean
    post: Post | null
    onCancel: () => void
    onSave: (updatedPost: Post) => void
}

export const EditPost: React.FC<EditPostModalProps> = ({
    visible,
    post,
    onCancel,
    onSave,
}) => {
    const [content, setContent] = useState<string>('')
    const [images, setImages] = useState<string[] | undefined>([])

    useEffect(() => {
        if (post) {
            setContent(post.description)
            setImages(post.image_url)
        }
    }, [post])

    const handleSave = () => {
        if (post) {
            const updatedPost: Post = {
                ...post,
                description: content,
                image_url: images,
            }
            onSave(updatedPost)
            message.success('Post updated!')
        }
    }

    const handleImageUpload = (info: any) => {}

    return (
        <Modal
            className={styles['modal']}
            title="Edit Post"
            open={false}
            onCancel={onCancel}
            onOk={handleSave}
            okText="Save"
        >
            <TextArea
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Edit your post content..."
                style={{ marginBottom: 16 }}
            />
            <Upload
                accept="image/*"
                showUploadList={false}
                multiple
                customRequest={({ file, onSuccess }) => {
                    setTimeout(() => {
                        onSuccess && onSuccess('ok')
                        handleImageUpload({
                            file: { status: 'done', originFileObj: file },
                        })
                    }, 500)
                }}
            >
                <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Upload>

            {images && images.length > 0 && (
                <div
                    style={{
                        marginTop: 16,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 8,
                    }}
                >
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Uploaded ${idx}`}
                            style={{
                                width: 80,
                                height: 80,
                                objectFit: 'cover',
                                borderRadius: 4,
                            }}
                        />
                    ))}
                </div>
            )}
        </Modal>
    )
}
