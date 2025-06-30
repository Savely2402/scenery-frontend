import { BrowserRouter, Routes, Route } from 'react-router'
import '../styles/globals.scss'
import './App.css'

import { AuthLayout } from '../widgets/AuthLayout/ui'
import { LoginForm } from '../features/LoginForm/ui'
import { RegisterForm } from '../features/RegisterForm/ui'
import { Main } from '../pages/Main/ui'
import { ErrorPage } from '../pages/ErrorPage/ui'

function App() {
    return (
        <>
            <div>
                <Routes>
                    <Route path="/" element={<AuthLayout />}>
                        <Route path="login" element={<LoginForm />} />
                        <Route path="register" element={<RegisterForm />} />
                    </Route>
                    <Route path="home" element={<Main />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
        </>
    )
}

export default App
