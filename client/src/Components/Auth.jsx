
import { createContext, useState, useContext } from "react";
import localforage from "localforage";
import { useEffect } from "react";

export const Authcontext = createContext({
  isInitiallyLoaded: false,
  token: "",
  saveToken: async (token) => {},
  removeToken: async () => {},
});

export const useAuth = () => {
  return useContext(Authcontext)
};

const tokenKey = "userToken";

const AuthProvider = (props) => {
  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
  const [token, setToken] = useState();

  const saveToken = async (token) => {
    setToken(token);
    await localforage.setItem(tokenKey, token);
  };

  const removeToken = async () => {
    setToken();
    await localforage.removeItem(tokenKey);
  };

  useEffect(() => {
    localforage.getItem(tokenKey).then((token) => {
      if (token) {
        setToken(token);
      }
      setIsInitiallyLoaded(true);
    });
  }, []);

  return (
    <Authcontext.Provider
      value={{
        token,
        isInitiallyLoaded,
        saveToken,
        removeToken,
      }}
    >
      {props.children}
    </Authcontext.Provider>
  );
};
export default AuthProvider;