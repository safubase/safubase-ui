// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import HamburgerIcon from '../icons/hamburger';
import NotificationIcon from '../icons/notification';

// CONTEXT
import { Context } from '../../context';

// STYLES
import style from './style.module.css';

class Header extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {}

  componentDidMount() {}

  render() {
    return (
      <header className={cn(style['header'])}>
        <div onClick={() => {}} className={cn(style['header-hamburgericon'])}>
          <HamburgerIcon />
        </div>

        <img
          className={cn(style['header-logo'])}
          src="/images/mobile_logo.png"
        />

        <div
          onClick={() => {}}
          className={cn(style['header-notificationicon'])}
        >
          <NotificationIcon />
        </div>
      </header>
    );
  }
}

export default Header;
