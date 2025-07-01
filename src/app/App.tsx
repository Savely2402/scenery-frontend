import { BrowserRouter, Routes, Route } from 'react-router'
import '../styles/globals.scss'
import './App.css'

import { AuthLayout } from '../widgets/AuthLayout/ui'
import { LoginForm } from '../features/LoginForm/ui'
import { RegisterForm } from '../features/RegisterForm/ui'
import { Main } from '../pages/Main/ui'
import { ErrorPage } from '../pages/ErrorPage/ui'
import { PrivateRouter } from './PrivateRouter'
import { ProfilePage } from '../pages/ProfilePage/ui'

function App() {
    return (
        <>
            <div>
                <Routes>
                    <Route path="/" element={<PrivateRouter />}>
                        <Route index element={<Main />} />
                        <Route path="home" element={<Main />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                    <Route element={<AuthLayout />}>
                        <Route path="login" element={<LoginForm />} />
                        <Route path="register" element={<RegisterForm />} />
                    </Route>
                </Routes>
            </div>
        </>
    )
}

export default App
