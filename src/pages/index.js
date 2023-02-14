// MODULES
import React from 'react';
import axios from 'axios';
import cn from 'classnames';

// COMPONENTS
import Head from '../components/head';
import UserLayout from '../components/layouts/user';

// CONTEXT
import { Context } from '../context';

// STYLES
import style from '../styles/pages/home.module.css';

class Home extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Head title="safubase" desc="safubase" />
        <UserLayout>
          <section>home</section>
        </UserLayout>
      </>
    );
  }
}

export default Home;
