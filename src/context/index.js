// MODULES
import React from 'react';

const initial_state = {
  // UI props
  ui_sidebar_open: false,
  ui_toasts: [],
  // user props
  user_auth: null, // false = logged out, true = logged in, null = waiting for the server response
  // httponly cookie in the browser backend for authentication
  user_id: null,
  user_username: null,
  user_email: null,
  user_email_verified: null,
  // wallet props
  wallet_address: null,
};

function reducer(value = initial_state, action) {
  return {
    ...action,
  };
}

export const Context = React.createContext();

export function Provider({ children }) {
  const [state, set_state] = React.useReducer(reducer, initial_state);
  const value = { state, set_state };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default {
  Context,
  Provider,
};
