// MODULES
import axios from 'axios';
import Web3 from 'web3';

// CONFIG
import config from '../config';

export function str_remove_extra_space(str, mode = 0) {
  if (!str || typeof str !== 'string') {
    return '';
  }

  if (typeof mode === 'number') {
    throw new Error('Invalid mode argument provided in remove_extra_space');
  }

  if (mode === 0) {
    let new_str = '';

    for (let i = 0; i < str.length; i++) {
      const current = str[i];
      const next = str[i + 1];

      if (current === ' ') {
        if (next && next !== ' ') {
          if (new_str.length) {
            new_str = new_str + current;
          }
        }
      } else {
        new_str = new_str + current;
      }
    }

    return new_str;
  }

  if (mode === 1) {
    return str.replace(/\s/g, ' ');
  }

  return '';
}

/**
 *
 * WALLET UPDATE, get wallet info e.g. address from web3 lib, put them in global context
 *
 */
export async function wallet_update(context) {
  let address = null;

  const accounts = await ethereum.request({
    method: 'eth_requestAccounts',
  });

  if (accounts[0]) {
    address = accounts[0];
  }

  context.set_state({
    ...context.state,
    wallet: {
      ...context.state.wallet,
      address: address,
    },
  });
}

export async function wallet_connect({ chain_id = 56 }, context) {
  const chains = {
    // Ethereum Mainnet
    1: {
      chainId: Web3.utils.toHex(1),
      chainName: 'ETHW-mainnet',
      rpcUrls: ['https://mainnet.ethereumpow.org'],
      blockExplorerUrls: ['https://mainnet.ethwscan.com'],
    },
    // Binance Smart Chain Mainnet
    56: {
      chainId: Web3.utils.toHex(56),
      chainName: 'Smart Chain',
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      blockExplorerUrls: ['https://bscscan.com'],
    },
  };

  let accounts = null;

  try {
    accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });

    context.set_state({
      ...context.state,
      wallet: {
        ...context.state.wallet,
        address: accounts[0],
      },
    });

    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: Web3.utils.toHex(chain_id) }],
    });

    accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });

    context.set_state({
      ...context.state,
      wallet: {
        ...context.state.wallet,
        address: accounts[0],
      },
    });
  } catch (err) {
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [chains[chain_id]],
    });

    accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });

    context.set_state({
      ...context.state,
      wallet: {
        ...context.state.wallet,
        address: accounts[0],
      },
    });
  }

  return accounts;
}

export function wallet_clear(context) {
  context.set_state({
    ...context.state,
    wallet: {
      ...context.state.wallet,
      address: null,
    },
  });
}

export default {
  str_remove_extra_space,
  wallet_update,
  wallet_connect,
  wallet_clear,
};
