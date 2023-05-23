import { createContext, useState } from 'react'
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [accessToken, setToken] = useState();
    const router = useRouter();

    if(!accessToken) {
        router.push('/auth');
    }

    return (
        <AuthContext.Provider value={{accessToken, setToken}}>
            {children}
        </AuthContext.Provider>
    );
}
