import type { LoginFormData } from '../features/types/forms'

interface User {
    id: number
    email: string
    password: string
    token: string
}

export async function fetchLoginUser(formData: LoginFormData): Promise<User> {
    const response = await fetch('localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(formData),
    })

    if (!response.ok) throw new Error('Ошибка при входе')

    return await response.json()
}
