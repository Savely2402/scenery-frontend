import styles from './topSection.module.scss'

import React, { useState } from 'react'

export const TopSection: React.FC = () => {
    const [query, setQuery] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        console.log('Поисковый запрос:', e.target.value)
    }

    return (
        <div className={styles.container}>
            <div className={styles['top-section-title']}>
                <h1>Resources and insights</h1>
            </div>
            <div className={styles['top-section-text']}>
                The latest industry news, interviews, technologies, and
                resources.
            </div>
            <div className={styles['input-wrapper']}>
                {/* <Input
                    sizeVariant="S"
                    type="text"
                    placeholder="Введите запрос..."
                    onChange={handleInputChange}
                /> */}
            </div>
        </div>
    )
}
