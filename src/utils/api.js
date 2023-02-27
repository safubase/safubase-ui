// MODULES
import axios from 'axios';

// CONFIG
import config from '../config';

/**
 *
 * AXIOS INSTANCE configuration
 *
 */
const instance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 *
 * GET PROFILE data from the server, also checks if current user is logged in with sid cookie?
 *
 */
export async function get_profile(version = 1, context) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in get_profile');
  }

  if (!context) {
    throw new Error('Context not provided in get_profile');
  }

  const url = config.api_url + '/v' + version + '/profile';

  try {
    const res = await instance.get(url);

    if (res.data === null) {
      // Logged out because data is null from the server 200
      context.set_state({
        ...context.state,
        auth: false,
        user: { id: '', username: '', email: '' },
      });

      return;
    }

    // Logged in successfully
    context.set_state({ ...context.state, auth: true, user: res.data });

    return res;
  } catch (err) {
    // Something went wrong with the request, automatically logout
    context.set_state({
      ...context.state,
      auth: false,
      user: { id: '', username: '', email: '' },
    });

    return null;
  }
}

/**
 *
 * SIGNUP Use this to sign a user to the database
 */
export async function signup(body, version = 1, context) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in signup');
  }

  if (!body || !context) {
    throw new Error('Body or Context not provided in signup');
  }

  const url = config.api_url + '/v' + version + '/signup';

  try {
    const res = await instance.post(url, body);

    context.set_state({ ...context.state, auth: true, user: res.data });

    return res;
  } catch (err) {
    // Something went wrong with the request, automatically logout
    context.set_state({
      ...context.state,
      auth: false,
      user: { id: '', username: '', email: '' },
    });

    return null;
  }
}

/**
 *
 * LOGIN Use this to log the user into server
 */
export async function login(body, version = 1, context) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in signup');
  }

  if (!body || !context) {
    throw new Error('Body or Context not provided in signup');
  }

  const url = config.api_url + '/v' + version + '/login';

  try {
    const res = await instance.post(url, body);

    context.set_state({
      ...context.state,
      auth: true,
      user: res.data,
    });

    return res;
  } catch (err) {
    // Something went wrong with the request, automatically logout
    context.set_state({
      ...context.state,
      auth: false,
      user: { id: '', username: '', email: '' },
    });

    return null;
  }
}

/***
 *
 * BLOCKCHAIN APIS
 *
 */
export async function blockchain_get_whales(
  chain = 'bsc',
  version = 1,
  context
) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in signup');
  }

  if (!context) {
    throw new Error('Body or Context not provided in signup');
  }

  const url =
    config.api_url + '/v' + version + '/blockchain/whales?chain=' + chain;

  try {
    const res = await instance.get(url);

    return res;
  } catch (err) {
    return null;
  }
}

export default {
  get_profile,
  signup,
  login,
  blockchain_get_whales,
};
