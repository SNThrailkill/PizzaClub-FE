import { createContext } from 'react'
import { useRouter } from 'next/navigation';
import { useCookies, CookiesProvider } from 'react-cookie';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [cookie, setToken] = useCookies(['accessToken']);
    const router = useRouter();

    // If an access token is not found in cookies then redirect to auth
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
