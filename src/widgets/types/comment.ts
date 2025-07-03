export interface User{
    id: number;
    name: string;
    job: string;
    avatar: string;
}

export interface Comment{
    id: number;
    author: User;
    content: string;
}