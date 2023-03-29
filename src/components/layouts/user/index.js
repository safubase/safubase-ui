// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Header from '../../header';
import Footer from '../../footer';
import Sidebar from '../../sidebar';
import Toaster from '../../toaster';

// CONTEXT
import { Context } from '../../../context/index.js';

// UTILS
import UTILS from '../../../utils/index.js';
import UTILS_API from '../../../utils/api.js';

// STYLES
import style from './style.module.css';

class Layout_user extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};

    this.init = this.init.bind(this);
  }

  // layout initialization
  async init() {
    UTILS.wallet_add_listeners(this.context);
    const wallet_accounts = await UTILS.wallet_req_accounts();

    // Context update
    this.context.set_state({
      ...this.context.state,
      ui_toasts: [],
      wallet_address: wallet_accounts[0],
    });
  }

  /**
   *
   * LAYOUT INIT, event listener registrations, update wallet, many more
   *
   */
  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <>
        <Header />
        <Sidebar />
        <Toaster />
        <main
          className={cn(
            style['main'],
            this.context.state.ui_sidebar_open ? style['mainsidebaropen'] : null
          )}
        >
          {this.props.element || this.props.children}
        </main>
      </>
    );
  }
}

export default Layout_user;
