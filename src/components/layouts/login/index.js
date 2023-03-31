// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Toaster from '../../toaster';

// CONTEXT
import { Context } from '../../../context/index.js';

// STYLES
import style from './style.module.css';

class Layout_login extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <>
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

export default Layout_login;
