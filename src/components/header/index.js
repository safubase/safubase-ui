// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Icon_hamburger from '../icons/hamburger';
import Icon_notification from '../icons/notification';
import Icon_docs from '../icons/doc';
import Icon_braces from '../icons/braces';
import Icon_chart from '../icons/chart';

// CONTEXT
import { Context } from '../../context';

// STYLES
import style from './style.module.css';

class Header extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      nav_open: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <header className={cn(style['header'])}>
        <div
          className={cn(
            style['header-navshadow'],
            this.state.nav_open ? style['header-navshadowopen'] : null
          )}
        ></div>
        <div
          className={cn(
            style['header-nav'],
            this.state.nav_open ? style['header-navopen'] : null
          )}
        >
          <a href="/" target="_self" className={cn(style['header-nav-logo'])}>
            <img src="/favicon.ico" />
          </a>

          <label className={cn(style['header-nav-label'])}>DEVELOPER</label>

          <a
            href="https://docs.safubase.com/safubase-developer/quick-start"
            target="_blank"
            className={cn(style['header-nav-item'])}
          >
            <Icon_braces active /> <span>Developer</span>
          </a>

          <a
            href="https://docs.safubase.com"
            target="_blank"
            className={cn(style['header-nav-item'])}
          >
            <Icon_docs active /> <span>DOCS</span>
          </a>

          <label className={cn(style['header-nav-label'])}>FINANCE</label>

          <a
            href="https://www.pinksale.finance/launchpad/0x6fC397ddF50A70817b41dF1BAb806C1A68fA7Ae1?chain=BSC"
            target="_blank"
            className={cn(style['header-nav-item'])}
          >
            <Icon_chart active /> <span>Presale</span>
          </a>
        </div>

        <div
          onClick={() => {
            this.setState({
              ...this.state,
              nav_open: !this.state.nav_open,
            });
          }}
          className={cn(style['header-hamburgericon'])}
        >
          <Icon_hamburger />
        </div>

        <a className={cn(style['header-logo'])} href="/" target="_self">
          <img src="/images/mobile_logo.png" />
        </a>

        <div
          onClick={() => {}}
          className={cn(style['header-notificationicon'])}
        >
          <Icon_notification />
        </div>
      </header>
    );
  }
}

export default Header;
