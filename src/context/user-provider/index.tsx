import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type UserContextType = {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
};
const UserContext = createContext<UserContextType>({ user: null, setUser: () => {} });

// Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(() => {
    const storedState = localStorage.getItem("user");
    return storedState ? JSON.parse(storedState) : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
