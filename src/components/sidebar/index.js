// MODULES
import React from 'react';
import cn from 'classnames';

// CONTEXT
import { Context } from '../../context';

// COMPONENTS
import Icon_home from '../icons/home';
import Icon_profile from '../icons/profile';
import Icon_settings from '../icons/settings';
import Icon_login from '../icons/login';
import Icon_logout from '../icons/logout';
import Icon_doc from '../icons/doc';

// UTILS
import UTILS from '../../utils/index';

// STYLES
import style from './style.module.css';

class Sidebar extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      pathname: '',
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      pathname: window.location.pathname,
    });
  }

  render() {
    return (
      <aside
        className={cn(
          style['sidebarctr'],
          this.context.state.ui_sidebar_open ? style['sidebarctropen'] : null
        )}
        onMouseOver={() => {
          if (window.innerWidth < 650) return;

          this.context.set_state({
            ...this.context.state,
            ui_sidebar_open: true,
          });
        }}
        onMouseLeave={() => {
          if (window.innerWidth < 650) return;

          this.context.set_state({
            ...this.context.state,
            ui_sidebar_open: false,
          });
        }}
      >
        <div className={cn(style['sidebarctr-sidebar'])}>
          <div className={cn(style['sidebarctr-sidebar-logo'])}>
            <a href="https://safubase.com" target="_blank">
              <img src="/images/safubase.png" />
            </a>
          </div>

          <div className={cn(style['sidebarctr-sidebar-top'])}>
            <a className={cn(style['sidebarctr-sidebar-top-iconctr'])} href="/">
              <Icon_home active={this.state.pathname === '/' ? true : false} />
              <span
                className={cn(
                  this.context.state.ui_sidebar_open
                    ? style['sidebarctr-sidebar-top-iconctr-spanactive']
                    : null
                )}
              >
                Home
              </span>
            </a>
          </div>

          <div className={cn(style['sidebarctr-sidebar-top'])}>
            <a
              className={cn(style['sidebarctr-sidebar-top-iconctr'])}
              href="https://docs.safubase.com"
            >
              <Icon_doc
                active={
                  this.state.pathname === 'docs.safubase.com' ? true : false
                }
              />

              <span
                className={cn(
                  this.context.state.ui_sidebar_open
                    ? style['sidebarctr-sidebar-top-iconctr-spanactive']
                    : null
                )}
              >
                DOCS
              </span>
            </a>
          </div>

          <div className={cn(style['sidebarctr-sidebar-bottom'])}>
            <div
              onClick={async () => {
                if (!this.context.state.wallet_address) {
                  const accounts = await UTILS.wallet_connect({ chain_id: 56 });

                  if (accounts === null) {
                    this.context.set_state({
                      ...this.context.state,
                      ui_toasts: [
                        ...this.context.state.ui_toasts,
                        {
                          type: 'error',
                          message: 'No web3 wallet detected in the browser',
                          created_at: new Date(),
                        },
                      ],
                    });

                    return;
                  }

                  this.context.set_state({
                    ...this.context.state,
                    wallet_address: accounts[0],
                  });
                }
              }}
              className={cn(style['sidebarctr-sidebar-bottom-iconctr'])}
            >
              {this.context.state.wallet_address ? (
                <>
                  <Icon_logout />
                  <span
                    className={cn(
                      this.context.state.ui_sidebar_open
                        ? style['sidebarctr-sidebar-bottom-iconctr-spanactive']
                        : null
                    )}
                  >
                    Logout
                  </span>
                </>
              ) : (
                <>
                  <Icon_login />
                  <span
                    className={cn(
                      this.context.state.ui_sidebar_open
                        ? style['sidebarctr-sidebar-bottom-iconctr-spanactive']
                        : null
                    )}
                  >
                    Login
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
