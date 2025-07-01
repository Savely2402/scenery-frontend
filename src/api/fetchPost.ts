import type { AxiosResponse } from 'axios'
import type {
    AddPostOptions,
    DeletePostOptions,
    GetPostOptions,
    PostData,
} from '../types/post'
import { axiosInstance } from '../axios'

export async function fetchAllPosts(): Promise<PostData[]> {
    try {
        const response: AxiosResponse<PostData[]> = await axiosInstance.get(
            'localhost:8000/getPosts'
        )

        const data: PostData[] = response.data

        console.log('All posts: ', data)

        return data
    } catch (err) {
        console.error('Ошибка получения постов: ', err)
        throw new Error('Ошибка получения постов')
    }
}

export async function fetchOnePost({
    post_id,
}: GetPostOptions): Promise<PostData> {
    try {
        const response: AxiosResponse<PostData> = await axiosInstance.get(
            'localhost:8000/getPost',
            {
                data: {
                    post_id,
                },
            }
        )

        const data: PostData = response.data

        console.log('One post: ', data)

        return data
    } catch (err) {
        console.error('Ошибка получения поста: ', err)
        throw new Error('Ошибка получения поста')
    }
}

export async function fetchAddPost({
    description,
    is_private,
    image_url,
}: AddPostOptions): Promise<PostData> {
    try {
        const response: AxiosResponse<PostData> = await axiosInstance.post(
            'localhost:8000/addPost',
            {
                data: {
                    description,
                },
            }
        )

        const data: PostData = response.data

        console.log('Add post: ', data)

        return data
    } catch (err) {
        console.error('Ошибка добавления поста: ', err)
        throw new Error('Ошибка добавления поста')
    }
}

export async function fetchDeletePost({
    post_id,
}: DeletePostOptions): Promise<PostData> {
    try {
        const response: AxiosResponse<PostData> = await axiosInstance.post(
            'localhost:8000/deletePost',
            {
                data: {
                    post_id,
                },
            }
        )

        const data: PostData = response.data

        console.log('Delete post: ', data)

        return data
    } catch (err) {
        console.error('Ошибка удаления поста: ', err)
        throw new Error('Ошибка удаления поста')
    }
}
