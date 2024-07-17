import {
  type FC,
  type ReactNode,
  type FormEvent,
  type MouseEvent,
  type MutableRefObject,
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from "react";
import { useLocalStorage } from "../hooks";

type AuthContext = {
  authenticated: boolean;
  handleLogin: (e: FormEvent<HTMLFormElement>) => void;
  handleLogout: (e: MouseEvent<HTMLInputElement>) => void;
  btnRef: MutableRefObject<HTMLInputElement | null>;
};
type ProviderProps = {
  children: ReactNode;
};

const tokenKey = import.meta.env.PUBLIC_REACT_APP_TOKEN_NAME;

const AuthContext = createContext<AuthContext | undefined>(undefined);

const AuthProvider: FC<ProviderProps> = ({ children }) => {
  const [localStore, setLocalStore] = useLocalStorage(tokenKey);
  const [authenticated, setAuthenticated] = useState(false);
  const btnRef = useRef<HTMLInputElement | null>(null);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    btnRef.current?.classList.add("animate-pulse");
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const res = await response.json();
        btnRef.current?.classList.replace("animate-pulse", "animate-ping-forward");
        setTimeout(() => {
          setLocalStore(response.headers.get("user"));
          alert(`Authentication successfull\r\n${JSON.stringify(res)}`);
        }, 12e2);
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
    btnRef.current?.classList.add("animate-ping-forward");
    setTimeout(() => {
      setLocalStore(false);
      setAuthenticated(false);
    }, 12e2);
  };

  const value = { authenticated, handleLogin, handleLogout, btnRef };

  /** TODO Add useEffect
   *  Check for access token in browser cookies
   *  Check for session id in document head meta
   */
  useEffect(() => {
    if (localStore && !authenticated) {
      setAuthenticated(true);
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
