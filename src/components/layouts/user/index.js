// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Header from '../../header';
import Footer from '../../footer';
import Sidebar from '../../sidebar';
import Toaster from '../../toaster';

// CONTEXT
import { Context } from '../../../context';

// UTILS
import UTILS from '../../../utils';
import UTILS_API from '../../../utils/api';

// STYLES
import style from './style.module.css';

class UserLayout extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   *
   * LAYOUT INIT, event listener registrations, update wallet, many more
   *
   */
  componentDidMount() {
    UTILS.wallet_add_listeners(this.context);
    UTILS.wallet_update(this.context);

    setTimeout(() => {
      this.context.set_state({
        ...this.context.state,
        ui_toasts: [
          ...this.context.state.ui_toasts,
          {
            type: 'success',
            message: '1 First toast',
            created_at: new Date(),
          },
        ],
      });
    }, 3000);

    setTimeout(() => {
      this.context.set_state({
        ...this.context.state,
        ui_toasts: [
          ...this.context.state.ui_toasts,
          {
            type: 'success',
            message: '2 Second toast',
            created_at: new Date(),
          },
        ],
      });
    }, 6000);
  }

  render() {
    return (
      <>
        <Header />
        <Sidebar />
        <main
          className={cn(
            style['main'],
            this.context.state.ui_sidebar_open ? style['mainsidebaropen'] : null
          )}
        >
          {this.props.element || this.props.children}
          <Toaster />
        </main>
        <Footer />
      </>
    );
  }
}

export default UserLayout;
