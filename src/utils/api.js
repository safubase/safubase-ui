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
export async function get_profile(version = 1) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in get_profile');
  }

  const url = config.api_url + '/v' + version + '/profile';

  try {
    const res = await axios_instance.get(url);

    if (res === null) {
      return null;
    }

    if (res.data === null) {
      return null;
    }

    return res;
  } catch (err) {
    return null;
  }
}

/**
 *
 * SIGNUP Use this to sign a user to the database
 */
export async function signup(version = 1, body) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in signup');
  }

  if (!body) {
    throw new Error('Body or Context not provided in signup');
  }

  const url = config.api_url + '/v' + version + '/signup';

  try {
    const res = await axios_instance.post(url, body);
    return res;
  } catch (err) {
    return null;
  }
}

/**
 *
 * LOGIN Use this to log the user into server
 */
export async function login(version = 1, body) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in signup');
  }

  if (!body) {
    throw new Error('Body or Context not provided in signup');
  }

  const url = config.api_url + '/v' + version + '/signin';

  try {
    const res = await axios_instance.post(url, body);
    return res;
  } catch (err) {
    return null;
  }
}

/***
 *
 * BLOCKCHAIN APIS
 *
 */
export async function blockchain_get_whales(version = 1, chain = 'bsc') {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in signup');
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

export async function blockchain_get_upcoming_unlocks(version = 1) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in signup');
  }

  const url = config.api_url + '/v' + version + '/blockchain/upcoming-unlocks';

  try {
    const res = await axios_instance.get(url);

    return res;
  } catch (err) {
    return null;
  }
}

export async function blockchain_audit(version = 1) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in signup');
  }

  const url = config.api_url + '/v' + version + '/blockchain/audit/0x123';

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
