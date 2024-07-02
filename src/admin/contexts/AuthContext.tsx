import {
  type FC,
  type ReactNode,
  type FormEvent,
  type MouseEvent,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import { useLocalStorage } from "../hooks";

type AuthContext = {
  authenticated: boolean;
  handleLogin: (e: FormEvent<HTMLFormElement>) => void;
  handleLogout: (e: MouseEvent<HTMLInputElement>) => void;
};
type ProviderProps = {
  children: ReactNode;
};

const tokenKey = "micholinAccessToken";

const AuthContext = createContext<AuthContext | undefined>(undefined);

const AuthProvider: FC<ProviderProps> = ({ children }) => {
  const [localStore, setLocalStore] = useLocalStorage(tokenKey);
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const res = await response.json();
        setTimeout(() => {
          alert("Authentication successfull" + "\r\n" + JSON.stringify(res));
          setLocalStore(!authenticated);
        }, 1e3);
        document
          .querySelector("#login-btn")
          ?.classList.add("animate-ping-forward");
      } else {
        const res = await response.json();
        throw res;
      }
    } catch (error) {
      let message = JSON.stringify(error);
      if (Array.isArray(error)) {
        message = error
          .map(item => Object.entries(item).join("- ").replace(",", ": "))
          .join("\r\n");
      }
      /** TODO - Add a error handler to display error toast on FE. */
      alert(message);
    }
  };
  const handleLogout = async (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setTimeout(() => {
      setLocalStore(false);
      setAuthenticated(false);
    }, 1e3);
    document
      .querySelector("#logout-btn")
      ?.classList.add("animate-ping-forward");
  };

  const value = { authenticated, handleLogin, handleLogout };

  /** TODO Add useEffect
   *  Check for access token in browser cookies
   *  Check for session id in document head meta
   */
  useEffect(() => {
    if (localStore && !authenticated) {
      setAuthenticated(localStore);
    }
  }, [authenticated, localStore]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error(`useAuthContext must be used within an AuthProvider`);
  }
  return authContext;
};

export { AuthProvider, useAuthContext };
