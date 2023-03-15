// MODULES
import React from 'react';
import cn from 'classnames';

// CONTEXT
import { Context } from '../../context';

// UTILS
import UTILS from '../../utils/index.js';
import UTILS_API from '../../utils/api.js';

// STYLES
import style from './style.module.css';

class Toaster extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      toasts: [],
      toasts_clear_timer_id: 0,
    };

    this.clear = this.clear.bind(this);
    this.update = this.update.bind(this);

    this.toaster_ref = React.createRef();
  }

  // Clears all the toasts after some time on update
  clear() {
    const toaster_div = this.toaster_ref.current;

    if (toaster_div.children.length === 0) {
      return;
    }

    for (let i = 0; i < toaster_div.children.length; i++) {
      toaster_div.children[i].classList.add(style['toaster-toastfade']);
    }

    setTimeout(() => {
      this.context.set_state({
        ...this.context.state,
        ui_toasts: [],
      });
    }, 1000);
  }

  // On new toast in context state
  update() {
    const toasts_global = [...this.context.state.ui_toasts];
    const toaster_div = this.toaster_ref.current;

    // Check created_at prop because everything depends on it,
    for (let i = 0; i < toasts_global.length; i++) {
      if (
        !toasts_global[i].created_at ||
        !toasts_global[i].created_at.valueOf()
      ) {
        throw new Error('created_at prop does not provided in a toast');
      }
    }

    if (toasts_global.length === this.state.toasts.length) {
      return;
    }

    const toasts_final = [...toasts_global];

    // Sort final toasts by date, we want the newest toaster to be on top
    for (let i = 0; i < toasts_final.length; i++) {
      for (let j = 0; j < toasts_final.length; j++) {
        if (toasts_final[j + 1]) {
          const current = toasts_final[j];
          const next = toasts_final[j + 1];

          if (current.created_at.valueOf() < next.created_at.valueOf()) {
            toasts_final[j] = next;
            toasts_final[j + 1] = current;
          }
        }
      }
    }

    // Remove all childs of toaster
    const child_len = toaster_div.children.length;
    for (let i = 0; i < child_len; i++) {
      toaster_div.removeChild(toaster_div.children[0]);
    }

    // After removing all children, start creating new elements and place them into toaster container.
    for (let i = 0; i < toasts_final.length; i++) {
      // Left icon
      const icon_img = document.createElement('img');
      icon_img.classList.add(style['toaster-toast-left-icon']);

      const text_div = document.createElement('div');
      text_div.classList.add(style['toaster-toast-left-message']);
      text_div.innerHTML = toasts_final[i].message;

      const icon_text_ctr_div = document.createElement('div');
      icon_text_ctr_div.classList.add(style['toaster-toast-left']);

      const close_icon_img = document.createElement('img');
      close_icon_img.classList.add(style['toaster-toast-right']);
      close_icon_img.src =
        'https://www.nicepng.com/png/detail/52-521935_close-white-close-button-png.png';

      close_icon_img.addEventListener('click', () => {
        const toasts_filtered = this.state.toasts.filter((curr, index) => {
          if (
            curr.created_at.valueOf() !== toasts_final[i].created_at.valueOf()
          ) {
            return curr;
          }
        });

        this.context.set_state({
          ...this.context.state,
          ui_toasts: toasts_filtered,
        });
      });

      const toast_div = document.createElement('div');
      toast_div.classList.add(style['toaster-toast']);
      toast_div.style.zIndex = toasts_final.length - i;

      // Give first one the slide animation
      if (i === 0) {
        toast_div.classList.add(style['toaster-toastani']);
      }

      switch (toasts_final[i].type) {
        case 'success':
          icon_img.src =
            'https://toppng.com/uploads/preview/white-check-mark-symbol-11549993297psg7f12raf.png';
          toast_div.classList.add(style['toaster-toastsuccess']);
          break;
        case 'error':
          icon_img.src =
            'https://mpng.subpng.com/20191107/uvs/transparent-circle-icon-cross-icon-5dc42f7ebdd1a2.4642042115731383027775.jpg';
          toast_div.classList.add(style['toaster-toasterror']);
          break;
        case 'info':
          icon_img.src =
            'https://www.pinclipart.com/picdir/middle/333-3334785_png-transparent-info-icon-white-clipart.png';
          toast_div.classList.add(style['toaster-toastinfo']);
          break;
        case 'warning':
          icon_img.src =
            '384x384-warning-icon-png-white-11563228099gnhiaopzil.png';
          toast_div.classList.add(style['toaster-toastwarning']);
          break;
      }

      icon_text_ctr_div.appendChild(icon_img);
      icon_text_ctr_div.appendChild(text_div);

      toast_div.appendChild(icon_text_ctr_div);
      toast_div.appendChild(close_icon_img);

      toaster_div.appendChild(toast_div);
    }

    // Set toasts clear timeout after deleting the current on process
    clearTimeout(this.state.toasts_clear_timer_id);

    const toasts_clear_timer_id = setTimeout(() => {
      this.clear();
    }, 4000);

    this.setState({
      ...this.state,
      toasts: toasts_final,
      toasts_clear_timer_id: toasts_clear_timer_id,
    });
  }

  componentDidMount() {}

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {}

  render() {
    return <div ref={this.toaster_ref} className={cn(style['toaster'])}></div>;
  }
}

export default Toaster;
