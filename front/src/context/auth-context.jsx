import React, { useReducer, useEffect, createContext } from "react";
import { useContext } from "react";
import { AUTH_ENDPOINT } from "../constants";
import { fetchUser, reducer } from "../reducers/auth-reducer";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    user: undefined,
    authenticated: undefined,
  });

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  return <AuthContext.Provider value={[state, dispatch]} {...props} />;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AppProvider");
  }

  const [state] = context;

  return {
    login: () => (window.location = `${AUTH_ENDPOINT}/api/auth/google`),
    logout: () => (window.location = `${AUTH_ENDPOINT}/api/auth/logout`),

    user: state.user,
    authenticated: state.authenticated,
  };
};
