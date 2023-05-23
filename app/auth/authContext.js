import { createContext } from 'react'
import { useRouter } from 'next/navigation';
import { useCookies, CookiesProvider } from 'react-cookie';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [cookie, setToken] = useCookies('access_token');
    const router = useRouter();

    if(!cookie.accessToken) {
        router.push('/auth');
    }

    return (
        <AuthContext.Provider value={{cookie, setToken}}>
            <CookiesProvider>
                {children}
            </CookiesProvider>
        </AuthContext.Provider>
    );
}
