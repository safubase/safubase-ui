// MODULES
import React from 'react';
import cn from 'classnames';

// CONTEXT
import { Context } from '../../context';

// COMPONENTS
import HomeIcon from '../icons/home';
import ProfileIcon from '../icons/profile';
import SettingsIcon from '../icons/settings';
import LoginIcon from '../icons/login';
import LogoutIcon from '../icons/logout';

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
          style['ctr'],
          this.context.state.ui_sidebar_open ? style['ctropen'] : null
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
        <div className={cn(style['ctr-sidebar'])}>
          <div className={cn(style['ctr-sidebar-top'])}>
            <a className={cn(style['ctr-sidebar-top-iconctr'])} href="/">
              <HomeIcon active={this.state.pathname === '/' ? true : false} />
              <span
                className={cn(
                  this.context.state.ui_sidebar_open
                    ? style['ctr-sidebar-top-iconctr-spanactive']
                    : null
                )}
              >
                Home
              </span>
            </a>

            <a className={cn(style['ctr-sidebar-top-iconctr'])} href="/profile">
              <ProfileIcon
                active={this.state.pathname === '/profile' ? true : false}
              />
              <span
                className={cn(
                  this.context.state.ui_sidebar_open
                    ? style['ctr-sidebar-top-iconctr-spanactive']
                    : null
                )}
              >
                Profile
              </span>
            </a>

            <a
              className={cn(style['ctr-sidebar-top-iconctr'])}
              href="/settings"
            >
              <SettingsIcon
                active={this.state.pathname === '/settings' ? true : false}
              />
              <span
                className={cn(
                  this.context.state.ui_sidebar_open
                    ? style['ctr-sidebar-top-iconctr-spanactive']
                    : null
                )}
              >
                Settings
              </span>
            </a>

            <a className={cn(style['ctr-sidebar-top-iconctr'])} href="#">
              <HomeIcon />
              <span
                className={cn(
                  this.context.state.ui_sidebar_open
                    ? style['ctr-sidebar-top-iconctr-spanactive']
                    : null
                )}
              >
                Home
              </span>
            </a>
          </div>

          <div className={cn(style['ctr-sidebar-bottom'])}>
            <div className={cn(style['ctr-sidebar-bottom-iconctr'])}>
              {this.context.state.auth ? (
                <>
                  <LogoutIcon />
                  <span
                    className={cn(
                      this.context.state.ui_sidebar_open
                        ? style['ctr-sidebar-bottom-iconctr-spanactive']
                        : null
                    )}
                  >
                    Logout
                  </span>
                </>
              ) : (
                <>
                  <LoginIcon />
                  <span
                    className={cn(
                      this.context.state.ui_sidebar_open
                        ? style['ctr-sidebar-bottom-iconctr-spanactive']
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
