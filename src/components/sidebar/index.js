// MODULES
import React from 'react';
import cn from 'classnames';

// CONTEXT
import { Context } from '../../context';

// COMPONENTS
import HomeIcon from '../icons/home';
import ProfileIcon from '../icons/profile';
import LoginIcon from '../icons/login';
import LogoutIcon from '../icons/logout';

// STYLES
import style from './style.module.css';

class Sidebar extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <aside
        className={cn(
          style['ctr'],
          this.context.state.sidebar_open ? style['ctropen'] : null
        )}
        onMouseOver={() => {
          if (window.innerWidth < 650) return;

          this.context.set_state({
            ...this.context.state,
            sidebar_open: true,
          });
        }}
        onMouseLeave={() => {
          if (window.innerWidth < 650) return;

          this.context.set_state({
            ...this.context.state,
            sidebar_open: false,
          });
        }}
      >
        <div className={cn(style['ctr-sidebar'])}>
          <div className={cn(style['ctr-sidebar-top'])}>
            <a className={cn(style['ctr-sidebar-top-iconctr'])} href="#">
              <HomeIcon />{' '}
              {this.context.state.sidebar_open ? <span>Home</span> : null}
            </a>

            <a className={cn(style['ctr-sidebar-top-iconctr'])} href="#">
              <ProfileIcon />{' '}
              {this.context.state.sidebar_open ? <span>Profile</span> : null}
            </a>

            <a className={cn(style['ctr-sidebar-top-iconctr'])} href="#">
              <HomeIcon />{' '}
              {this.context.state.sidebar_open ? <span>Home</span> : null}
            </a>

            <a className={cn(style['ctr-sidebar-top-iconctr'])} href="#">
              <HomeIcon />{' '}
              {this.context.state.sidebar_open ? <span>Home</span> : null}
            </a>
          </div>

          <div className={cn(style['ctr-sidebar-bottom'])}>
            <div className={cn(style['ctr-sidebar-bottom-iconctr'])}>
              {this.context.state.auth ? (
                <>
                  <LogoutIcon />{' '}
                  {this.context.state.sidebar_open ? <span>Logout</span> : null}
                </>
              ) : (
                <>
                  <LogoutIcon />{' '}
                  {this.context.state.sidebar_open ? <span>Login</span> : null}
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
