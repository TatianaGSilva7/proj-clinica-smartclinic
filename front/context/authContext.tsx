"use client"

import { createContext, useContext, useState, ReactNode } from "react";

type UserData = {
    email: string;
    token: string;
};

type AuthContextType = {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

 const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("error: useAuth must be used within an AuthProvider");
    return context;
}

export { AuthProvider, AuthContext };