import type React from 'react'
import { PostsContext } from '../contexts/PostsContext'
import { useFetch } from '../hooks/useFetch'
import { fetchAllPosts, type Post } from '../shared/api'

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const {
        data: posts,
        setData: setPosts,
        isLoading,
        error,
    } = useFetch<Post[]>(fetchAllPosts)

    return (
        <PostsContext.Provider value={{ posts, setPosts, isLoading, error }}>
            {children}
        </PostsContext.Provider>
    )
}
