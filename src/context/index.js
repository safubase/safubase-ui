// MODULES
import React from 'react';

const initial_state = {
  user: {
    // current user info
    _id: '',
    username: '',
    email: '',
    email_verified: false,
  },
  auth: null, // false = logged out, true = logged in, null = waiting for the server response
  sidebar_open: false,
  wallet: {
    // Metamask or Trust Wallet data
    address: null,
  },
};

function reducer(value = initial_state, action) {
  return {
    ...action,
  };
}

export const Context = React.createContext();

export function Provider({ children }) {
  const [state, set_state] = React.useReducer(reducer, initial_state);
  const value = {
    state,
    set_state,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default {
  Context,
  Provider,
};
