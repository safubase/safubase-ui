// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Header from '../../header';
import Footer from '../../footer';
import Sidebar from '../../sidebar';

// CONTEXT
import { Context } from '../../../context';

// UTILS
import UTILS from '../../../utils';
import UTILS_API from '../../../utils/api.js';

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
    UTILS.wallet_update(this.context);

    // WALLET EVENTS

    if (window.ethereum) {
      ethereum.on('accountsChanged', (accounts) => {
        if (!accounts.length || !accounts) {
          UTILS.wallet_clear(this.context);
          return;
        }

        UTILS.wallet_update(this.context);
      });
    }
  }

  render() {
    return (
      <>
        <Header />
        <Sidebar />
        <main
          className={cn(
            style['main'],
            this.context.state.sidebar_open ? style['sidebaropen'] : null
          )}
        >
          {this.props.element || this.props.children}
        </main>
        <Footer />
      </>
    );
  }
}

export default UserLayout;
