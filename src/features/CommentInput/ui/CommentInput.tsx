import { Avatar, Input } from 'antd'
import { useState } from 'react'
import styles from './commentInput.module.scss'

interface CommentInputProps {
  avatar: string | undefined
  onSubmit: (text: string) => void
}

export const CommentInput: React.FC<CommentInputProps> = ({ avatar, onSubmit }) => {
  const [text, setText] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (text.trim()) {
        onSubmit(text.trim())
        setText('')
      }
    }
  }

  return (
    <div className={styles.inputWrapper}>
      <Avatar src={avatar} className={styles.avatar}/>
      <Input.TextArea
        placeholder="Share your thoughts here..."
        autoSize={{ minRows: 1, maxRows: 4 }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.textArea}
      />
    </div>
  )
}
