import styles from './topSection.module.scss'
import { Input } from '../../shared/Input'
import React, { useState } from 'react';
import iconUrl from '../../assets/IconSearch.svg'

export const TopSection: React.FC = () => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        console.log('Поисковый запрос:', e.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.topSectionTitle}>
                <h1>Resources and insights</h1>
            </div>
            <div className={styles.topSectionText}>
                The latest industry news, interviews, technologies, and resources.
            </div>
            <div className={styles.inputWrapper}>
                <Input
                    sizeVariant='S'
                    type="text"
                    placeholder="Введите запрос..."
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};


