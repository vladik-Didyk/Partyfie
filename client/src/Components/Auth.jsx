
import { createContext, useState, useContext } from "react";
import localforage from "localforage";
import { useEffect } from "react";
import axios from "axios"

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
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

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
        setRefreshToken(token)
        console.log(refreshToken)
        setExpiresIn()
      }
      setIsInitiallyLoaded(true);
    });
  }, []);

  // useEffect(() => {
  //   if (!refreshToken || !expiresIn) return
  //   const interval = setInterval(() => {
  //     axios
  //       .post("http://localhost:8080/refresh", {
  //         refreshToken,
  //       })
  //       .then(res => {
  //         setToken(res.data.accessToken)
  //         setExpiresIn()
  //       })
  //       .catch(() => {
  //         window.location = "/"

  //       })  
  //   }, (expiresIn - 60) * 1000)

  //   return () => clearInterval(interval)
  // }, [refreshToken, expiresIn])     


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