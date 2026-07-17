import { useContext, useEffect } from 'react'
import { AuthContext } from '../auth.context.jsx'
import { register, login, logout, getMe } from '../services/auth.api.js'

export const useAuth = () => {
    const { user, setUser, isLoading, setIsLoading } = useContext(AuthContext)
    const handleLogin = async ({ email, password }) => {
        setIsLoading(true) //setting loading state to true is a job of hooks but swhowing the loading state is a job of component
        try {
            const data = await login({ email, password })
            setUser(data.user)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }
    const handleRegister = async ({ username, email, password }) => {
        setIsLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }
    const handleLogout = async () => {
        setIsLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                if (data?.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error(err);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }
        getAndSetUser()
    }, [])

    return { user, isLoading, handleLogin, handleRegister, handleLogout }
}