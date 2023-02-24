// MODULES
import axios from 'axios';
import Web3 from 'web3';

// CONFIG
import config from '../config';

export function remove_extra_space(str, mode = 0) {
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

export async function connect_wallet({ chain_id = 56 }) {
  if (!window.ethereum) {
    throw new Error('Web3 lib is not imported');
  }

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

  const accounts = await ethereum.request({
    method: 'eth_requestAccounts',
  });

  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: Web3.utils.toHex(chain_id) }],
    });
  } catch (err) {
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [chains[chain_id]],
    });
  }

  return accounts;
}

export default {
  remove_extra_space,
  connect_wallet,
};
