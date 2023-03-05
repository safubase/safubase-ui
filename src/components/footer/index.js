// MODULES
import React from 'react';
import cn from 'classnames';

// CONTEXT
import { Context } from '../../context';

// STYLES
import style from './style.module.css';

class Footer extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer
        className={cn(
          style['footer'],
          this.context.state.ui_sidebar_open ? style['footersidebaropen'] : null
        )}
      >
        <p className={cn(style['footer-disclaimer'])}>
          Disclaimer: The information provided shall not in any way constitute a
          recommendation as to whether you should invest in any product
          discussed. We accept no liability for any loss occasioned to any
          person acting or refraining from action as a result of any material
          provided or published.
        </p>
      </footer>
    );
  }
}

export default Footer;
