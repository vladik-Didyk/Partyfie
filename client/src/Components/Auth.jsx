
import { createContext, useState, useContext } from "react";
import localforage from "localforage";
import { useEffect } from "react";

export const Authcontext = createContext({
  isInitiallyLoaded: false,
  token: "",
  saveToken: async (token) => {},
  removeToken: async () => {},
  saveUser: async (user) => {},
  removeUser: async () => {},
});

const userKey = "userInfo";

export const useAuth = () => {
  return useContext(Authcontext)
};

const tokenKey = "userToken";
const AuthProvider = (props) => {
  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const saveToken = async (token) => {
    setToken(token);
    await localforage.setItem(tokenKey, token);
  };
  const removeToken = async () => {
    setToken();
    await localforage.removeItem(tokenKey);
  };
  useEffect(() => {
    const awaitUser = async () => {
      localforage.getItem(tokenKey).then((token) => {
        if (token) {
          setToken(token);
        }
        localforage.getItem(userKey).then((user) => {
          console.log(user);
          if (user) {
            setUser(user);
          }
        });
        setIsInitiallyLoaded(true);
      });
      awaitUser();
    };
  }, []);
  const saveUser = async (user) => {
    setUser(user);
    await localforage.setItem(userKey, user);
  };

  const removeUser = async () => {
    setUser();
    await localforage.removeItem(userKey, user);
  };
  return (
    <Authcontext.Provider
      value={{
        token,
        isInitiallyLoaded,
        saveToken,
        removeToken,
        saveUser,
        removeUser,
        user,
      }}
    >
      {props.children}
    </Authcontext.Provider>
  );
};
export default AuthProvider;