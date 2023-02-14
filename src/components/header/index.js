// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import HamburgerIcon from '../icons/hamburger';

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
        <div
          onClick={() => {
            this.context.set_state({
              ...this.context.state,
              sidebar_open: !this.context.state.sidebar_open,
            });
          }}
          className={cn(style['header-hamicon'], 'flxctrctr')}
        >
          <HamburgerIcon />
        </div>
      </header>
    );
  }
}

export default Header;
