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

// STYLES
import style from './style.module.css';

// test

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

            <a
              className={cn(style['sidebarctr-sidebar-top-iconctr'])}
              href="/profile"
            >
              <Icon_profile
                active={this.state.pathname === '/profile' ? true : false}
              />
              <span
                className={cn(
                  this.context.state.ui_sidebar_open
                    ? style['sidebarctr-sidebar-top-iconctr-spanactive']
                    : null
                )}
              >
                Profile
              </span>
            </a>

            <a
              className={cn(style['sidebarctr-sidebar-top-iconctr'])}
              href="/settings"
            >
              <Icon_settings
                active={this.state.pathname === '/settings' ? true : false}
              />
              <span
                className={cn(
                  this.context.state.ui_sidebar_open
                    ? style['sidebarctr-sidebar-top-iconctr-spanactive']
                    : null
                )}
              >
                Settings
              </span>
            </a>

            <a className={cn(style['sidebarctr-sidebar-top-iconctr'])} href="#">
              <Icon_home />
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

          <div className={cn(style['sidebarctr-sidebar-bottom'])}>
            <div className={cn(style['sidebarctr-sidebar-bottom-iconctr'])}>
              {this.context.state.auth ? (
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
