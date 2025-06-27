import { BrowserRouter, Routes, Route } from 'react-router'
import '../styles/globals.scss'
import './App.css'

import { AuthLayout } from '../widgets/AuthLayout'
import { LoginForm } from '../features/LoginForm'
import { RegisterForm } from '../features/RegisterForm'
import { Main } from '../pages/Main'
import { ErrorPage } from '../pages/ErrorPage'

function App() {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<AuthLayout />}>
                            <Route path="login" element={<LoginForm />} />
                            <Route path="register" element={<RegisterForm />} />
                        </Route>
                        <Route path="home" element={<Main />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App
