export interface User{
    id: string;
    name: string;
    job: string;
    avatar: string;
}

export interface Post{
    id: string;
    author: User; 
    content: string;
    image?: string; 
} 