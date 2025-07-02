import type { User } from './auth'
import { fetchData } from '../../utils/fetchData'

export interface Post {
    id: number
    author: User
    description: string
    likes_count: number
    is_private?: boolean
    image_url?: string[]
    created_at: string
    updated_at: string
}

export interface GetPostRequest {
    post_id: number
}

export interface AddPostRequest {
    description: string
    is_private?: boolean
    image_url?: string
}

export interface EditPostRequest extends AddPostRequest {
    post_id: number
}

export interface Response {
    detail: string
}

export async function fetchAllPosts(): Promise<Post[]> {
    try {
        const data = await fetchData<Post[]>({
            url: '/posts/',
            method: 'GET',
        })

        return data
    } catch (err) {
        console.error('Error getting posts:', err)
        throw new Error('Error getting posts:')
    }
}

export async function fetchOnePost({ post_id }: GetPostRequest): Promise<Post> {
    try {
        const data = await fetchData<Post>({
            url: `/posts/${post_id}/`,
            method: 'GET',
        })

        return data
    } catch (err) {
        console.error('Error getting post: ', err)
        throw new Error('Error getting post')
    }
}

export async function addPost({
    description,
    is_private,
    image_url,
}: AddPostRequest): Promise<Post> {
    try {
        const data = await fetchData<Post, AddPostRequest>({
            url: '/posts/',
            method: 'POST',
            data: {
                description,
            },
        })

        return data
    } catch (err) {
        console.error('Error adding post: ', err)
        throw new Error('Error adding post')
    }
}

export async function deletePost({
    post_id,
}: GetPostRequest): Promise<Response> {
    try {
        const data = await fetchData<Response>({
            url: `/posts/${post_id}`,
            method: 'DELETE',
        })

        return data
    } catch (err) {
        console.error('Error deleting post: ', err)
        throw new Error('Error deleting post:')
    }
}

export async function editPost({ post_id }: EditPostRequest): Promise<Post> {
    try {
        const data = await fetchData<Post>({
            url: `/posts/${post_id}`,
            method: 'PUT',
        })

        return data
    } catch (err) {
        console.error('Error updating post: ', err)
        throw new Error('Error updating post:')
    }
}
