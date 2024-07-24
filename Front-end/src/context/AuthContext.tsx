import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { checkAuthStatus, loginUser, logoutUser, signupUser } from "../helpers/api-communicators";

type User = {
    name: string;
    email: string;
}

type userAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<userAuth | null>(null);
export const AuthProvider = ({children} : { children: ReactNode }) => {
    const [user, setUser] = useState<User|null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const hasCheckedStatus = useRef(false);

    useEffect(() => {
        if (!hasCheckedStatus.current) {
            async function checkStatus() {
              const data = await checkAuthStatus();
              if (data) {
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
              }
              else {
                setIsLoggedIn(false);
              }
            }
            checkStatus();
            hasCheckedStatus.current = true;
        }
    }, []);

    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        if(data) {
            setUser({email:data.email, name: data.name});
            setIsLoggedIn(true);
        }
    };
    const signup = async (name: string, email: string, password: string) => {
        const data = await signupUser(name, email, password);
        if(data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    };
    const logout = async () => {
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
    };

    const value = {
        user, isLoggedIn, login, logout, signup
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);