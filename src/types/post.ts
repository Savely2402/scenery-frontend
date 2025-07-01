import type { UserData } from './user'

export interface Comment {
    id: number
    comment_text: string
    post_id: number
    author_id: number
    reply_to: number
}

export interface GetPostOptions {
    post_id: number
}

export interface AddPostOptions {
    description: string
    is_private?: boolean
    image_url?: string
}

export interface EditPostOptions extends AddPostOptions {
    post_id: number
}

export interface DeletePostOptions {
    post_id: number
}

export interface PostData {
    id: number
    author: UserData
    description: string
    likes_count: number
    is_private: boolean
    image_url?: string
    created_at: string
    updated_at: string
}
