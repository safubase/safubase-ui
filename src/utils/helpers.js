// MODULES
import axios from 'axios';

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

export default {
  remove_extra_space,
};
