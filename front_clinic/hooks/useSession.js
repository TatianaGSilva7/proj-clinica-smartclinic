import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";

type UserData = {
  email: string;
  token: string;
};

export const useSession = () => {
  const { user, setUser } = useAuth();
  const [isLogged, setIsLogged] = useState(false);

   useEffect(() => {
        setIsLogged(!!user);
    }, [user]);

  const login = (UserData: UserData) => {
    localStorage.setItem("user", JSON.stringify(UserData));
    setUser(UserData);
    setIsLogged(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLogged(false);
  };

  return { login, logout, isLogged, user, setIsLogged };
};
