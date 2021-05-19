
import { createContext, useState, useContext } from "react";
import localforage from "localforage";
import { useEffect } from "react";
import axios from 'axios';

export const Authcontext = createContext({
  isInitiallyLoaded: false,
  token: "",
  saveToken: async (token) => {},
  removeToken: async () => {},
  currentUser: {},
  getCurrentUser: async (token) => {},
});

export const useAuth = () => {
  return useContext(Authcontext)
};

const tokenKey = "userToken";
const profile_api_url = 'https://api.spotify.com/v1/me';

const AuthProvider = (props) => {
  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
  const [token, setToken] = useState();
  const [currentUser, setCurrentUser] = useState({});
  const saveToken = async (token) => {
    console.log(token);
    setToken(token);
    await localforage.setItem(tokenKey, token);
  };

  const removeToken = async () => {
    setToken();
    await localforage.removeItem(tokenKey);
  };

  const getCurrentUser = async (token) => {
    const bearer = `Bearer ${token}`;
    const config = {
    headers: { Authorization: bearer }
};
   const user = await axios.get(profile_api_url, config);
   console.log(user);
    setCurrentUser(user);  
  }

  useEffect(() => {
    localforage.getItem(tokenKey).then((token) => {
      if (token) {
        setToken(token);
      }
      setIsInitiallyLoaded(true);
      getCurrentUser(token);
    });
  }, []);

  return (
    <Authcontext.Provider
      value={{
        token,
        isInitiallyLoaded,
        saveToken,
        removeToken,
        currentUser,
        setCurrentUser,
        getCurrentUser,
      }}
    >
      {props.children}
    </Authcontext.Provider>
  );
};
export default AuthProvider;