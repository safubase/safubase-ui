// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Header from '../../header';
import Footer from '../../footer';
import Sidebar from '../../sidebar';

// CONTEXT
import { Context } from '../../../context';

// UTILS
import UTILS_HELPER from '../../../utils/helpers.js';
import UTILS_API from '../../../utils/api.js';

// STYLES
import style from './style.module.css';

class UserLayout extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    UTILS_API.get_profile(1, this.context);
  }

  render() {
    return (
      <>
        <Header />
        <Sidebar />
        <main
          className={cn(
            style['main'],
            this.context.state.sidebar_open ? style['sidebaropen'] : null
          )}
        >
          {this.props.element || this.props.children}
        </main>
        <Footer />
      </>
    );
  }
}

export default UserLayout;
