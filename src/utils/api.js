// MODULES
import axios from 'axios';

// CONFIG
import config from '../config';

/**
 *
 * AXIOS axios_instance configuration
 *
 */
export const axios_instance = axios.create({
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
    const res = await axios_instance.get(url);

    if (!res === null || !res.data === null) {
      // Logged out because data is null from the server 200
      context.set_state({
        ...context.state,
        user_auth: false,
        user_id: res.data._id,
        user_username: res.data.username,
        user_email: res.data.email,
        user_email_verifed: res.data.email_verified,
      });

      return;
    }

    // Logged in successfully
    context.set_state({
      ...context.state,
      user_auth: true,
      user_id: res.data._id,
      user_username: res.data.username,
      user_email: res.data.email,
      user_email_verifed: res.data.email_verified,
    });

    return res;
  } catch (err) {
    // Something went wrong with the request, automatically logout
    context.set_state({
      ...context.state,
      user_auth: false,
      user_id: null,
      user_username: null,
      user_email: null,
      user_email_verifed: null,
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
    const res = await axios_instance.post(url, body);

    context.set_state({
      ...context.state,
      user_auth: false,
      user_id: res.data._id,
      user_username: res.data.username,
      user_email: res.data.email,
      user_email_verifed: res.data.email_verified,
    });

    return res;
  } catch (err) {
    // Something went wrong with the request, automatically logout
    // Something went wrong with the request, automatically logout
    context.set_state({
      ...context.state,
      user_auth: false,
      user_id: null,
      user_username: null,
      user_email: null,
      user_email_verifed: null,
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
    const res = await axios_instance.post(url, body);

    context.set_state({
      ...context.state,
      user_auth: false,
      user_id: res.data._id,
      user_username: res.data.username,
      user_email: res.data.email,
      user_email_verifed: res.data.email_verified,
    });

    return res;
  } catch (err) {
    // Something went wrong with the request, automatically logout
    // Something went wrong with the request, automatically logout
    context.set_state({
      ...context.state,
      user_auth: false,
      user_id: null,
      user_username: null,
      user_email: null,
      user_email_verifed: null,
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
    const res = await axios_instance.get(url);

    return res;
  } catch (err) {
    return null;
  }
}

export async function blockchain_get_upcoming_unlocks(version = 1, context) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in signup');
  }

  if (!context) {
    throw new Error('Body or Context not provided in signup');
  }

  const url = config.api_url + '/v' + version + '/blockchain/upcoming-unlocks';

  try {
    const res = await axios_instance.get(url);

    return res;
  } catch (err) {
    return null;
  }
}

export default {
  axios_instance,
  get_profile,
  signup,
  login,
  blockchain_get_whales,
  blockchain_get_upcoming_unlocks,
};
