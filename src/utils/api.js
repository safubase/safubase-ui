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
 * API function return types
 *
 * ERROR { code: 'ERR_BAD_REQUEST', message: 'Credentials are not provided', type: 'auth:signin' }
 *
 * SUCCESS { data: { _id: '123' }, headers: { 'Content-Type: 'application/json' } }
 *
 */

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

    res.code = undefined;

    return res;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      return { code: err.code, message: 'No internet connection' };
    }

    if (!err.response) {
      return { code: err.code, message: err.message };
    }

    return { ...err.response.data, code: err.code, data: null };
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

    res.code = undefined;

    return res;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      return { code: err.code, message: 'No internet connection' };
    }

    if (!err.response) {
      return { code: err.code, message: err.name };
    }

    return { ...err.response.data, code: err.code };
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

    res.code = undefined;

    return res;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      return { code: err.code, message: 'No internet connection' };
    }

    if (!err.response) {
      return { code: err.code, message: err.name };
    }

    return { ...err.response.data, code: err.code };
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

    res.code = undefined;

    return res;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      return { code: err.code, message: 'No internet connection' };
    }

    if (!err.response) {
      return { code: err.code, message: err.name };
    }

    return { ...err.response.data, code: err.code };
  }
}

export async function blockchain_get_upcoming_unlocks(version = 1) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in signup');
  }

  const url = config.api_url + '/v' + version + '/blockchain/upcoming-unlocks';

  try {
    const res = await axios_instance.get(url);

    res.code = undefined;

    return res;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      return { code: err.code, message: 'No internet connection' };
    }

    if (!err.response) {
      return { code: err.code, message: err.name };
    }

    return { ...err.response.data, code: err.code };
  }
}

export async function blockchain_audit(version = 1) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in signup');
  }

  const url = config.api_url + '/v' + version + '/blockchain/audit/0x123';

  try {
    const res = await axios_instance.get(url);

    res.code = undefined;

    return res;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      return { code: err.code, message: 'No internet connection' };
    }

    if (!err.response) {
      return { code: err.code, message: err.name };
    }

    return { ...err.response.data, code: err.code };
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
