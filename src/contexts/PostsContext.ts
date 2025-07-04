import { createContext } from 'react'
import type { Post } from '../shared/api'

interface PostsContextType {
    posts: Post[] | null
    setPosts: (posts: Post[] | null) => void
    isLoading: boolean
    error: unknown
}

export const PostsContext = createContext<PostsContextType | undefined>(
    undefined
)
