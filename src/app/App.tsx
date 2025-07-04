import { Routes, Route } from 'react-router'
import '../styles/globals.scss'
import './App.css'
import { PrivateRouter } from './PrivateRouter'
import { Main } from '../pages/Main'
import { ProfilePage } from '../pages/ProfilePage'
import { ErrorPage } from '../pages/ErrorPage'
import { AuthLayout } from '../widgets/AuthLayout'
import { LoginForm } from '../features/LoginForm'
import { RegisterForm } from '../features/RegisterForm'
import { Layout } from '../widgets/Layout'
import { SettingsLayout } from '../widgets/SettingsLayout'
import { GeneralSettings } from '../features/GeneralSettings'
import { AccountSettings } from '../features/AccountSettings'
import { PostsProvider } from './PostsProvider'

function App() {
    return (
        <>
            <div>
                <Routes>
                    <Route element={<PrivateRouter />}>
                        <Route path="/" element={<Layout />}>
                            <Route
                                index
                                element={
                                    <PostsProvider>
                                        <Main />
                                    </PostsProvider>
                                }
                            />
                            <Route
                                path="home"
                                element={
                                    <PostsProvider>
                                        <Main />
                                    </PostsProvider>
                                }
                            />

                            <Route path="profile" element={<ProfilePage />}>
                                <Route
                                    path="settings"
                                    element={<SettingsLayout />}
                                >
                                    <Route
                                        index
                                        element={<GeneralSettings />}
                                    />
                                    <Route
                                        path="general"
                                        element={<GeneralSettings />}
                                    />
                                    <Route
                                        path="account"
                                        element={<AccountSettings />}
                                    />
                                </Route>
                            </Route>
                        </Route>
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
