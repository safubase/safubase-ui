// MODULES
import React from 'react';
import cn from 'classnames';

// CONTEXT
import { Context } from '../../context';

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
          style['sidebar'],
          this.context.state.sidebar_open ? style['sidebar-open'] : null
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
        <div className={cn(style['sidebar-nav'])}>nav</div>
      </aside>
    );
  }
}

export default Sidebar;
