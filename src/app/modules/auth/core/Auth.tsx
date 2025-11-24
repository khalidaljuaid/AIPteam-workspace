'use client'

import { FC, useState, useEffect, createContext, useContext, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'

export interface AuthModel {
    email: string
    name: string
    role: string
    department?: string
}

type AuthContextProps = {
    auth: AuthModel | undefined
    saveAuth: (auth: AuthModel | undefined) => void
    currentUser: AuthModel | undefined
    setCurrentUser: Dispatch<SetStateAction<AuthModel | undefined>>
    logout: () => void
}

const initAuthContextPropsState = {
    auth: undefined,
    saveAuth: () => { },
    currentUser: undefined,
    setCurrentUser: () => { },
    logout: () => { },
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<AuthModel | undefined>(undefined)
    const [currentUser, setCurrentUser] = useState<AuthModel | undefined>(undefined)
    const router = useRouter()

    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (userData) {
            const user = JSON.parse(userData)
            setAuth(user)
            setCurrentUser(user)
        }
    }, [])

    const saveAuth = (auth: AuthModel | undefined) => {
        setAuth(auth)
        if (auth) {
            localStorage.setItem('user', JSON.stringify(auth))
        } else {
            localStorage.removeItem('user')
        }
    }

    const logout = () => {
        saveAuth(undefined)
        setCurrentUser(undefined)
        router.push('/')
    }

    return (
        <AuthContext.Provider value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth }
