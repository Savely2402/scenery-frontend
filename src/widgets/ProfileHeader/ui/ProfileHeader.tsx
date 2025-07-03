import type React from 'react'
import avatarMan from '../../../assets/avatarMan.png'
import styles from './profileHeader.module.scss'
import { Button } from 'antd'
import { Link } from 'react-router'
import { useState } from 'react'

const profileNavItems: {
    label: string
    link: string
}[] = [
    {
        label: 'My posts',
        link: '/my-posts',
    },
    {
        label: 'Saved posts',
        link: '/saved-posts',
    },
    {
        label: 'Settings',
        link: '/settings',
    },
]

export const ProfileHeader: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0)

    return (
        <div className={styles['profile-header']}>
            <div className={styles['profile-header__user']}>
                <div className={styles['profile-header__info']}>
                    <img
                        src={avatarMan}
                        alt="avatar"
                        className={styles['profile-header__avatar-img']}
                    />
                    <div className={styles['profile-header__details']}>
                        <div className={styles['profile-header__identity']}>
                            <span className={styles['profile-header__name']}>
                                Robert Fox
                            </span>
                            <span
                                className={styles['profile-header__delimiter']}
                            >
                                /
                            </span>
                            <span
                                className={styles['profile-header__username']}
                            >
                                @robert
                            </span>
                        </div>
                        <p className={styles['profile-header__job']}>
                            Software Engineer
                        </p>
                    </div>
                </div>
                <div className={styles['profile-header__stats']}>
                    <button className={styles['profile-header__stat-item']}>
                        <span className={styles['profile-header__value']}>
                            12
                        </span>
                        <span className={styles['profile-header__label']}>
                            Posts
                        </span>
                    </button>
                    <button className={styles['profile-header__stat-item']}>
                        <span className={styles['profile-header__value']}>
                            207
                        </span>
                        <span className={styles['profile-header__label']}>
                            Followers
                        </span>
                    </button>
                    <button className={styles['profile-header__stat-item']}>
                        <span className={styles['profile-header__value']}>
                            64
                        </span>
                        <span className={styles['profile-header__label']}>
                            Following
                        </span>
                    </button>
                </div>
            </div>
            <div className={styles['profile-header__nav']}>
                {profileNavItems.map(({ link, label }, index) => (
                    <Link
                        to={link}
                        className={styles['profile-header__nav-link']}
                    >
                        <Button
                            onClick={() => {
                                setActiveIndex(index)
                            }}
                            className={[
                                styles['profile-header__nav-btn'],
                                activeIndex === index ? styles.active : '',
                                styles['no-hover-button'],
                            ].join(' ')}
                        >
                            {label}
                        </Button>
                    </Link>
                ))}
            </div>
        </div>
    )
}
