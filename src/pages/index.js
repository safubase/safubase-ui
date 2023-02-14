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

/**
 *
 * SERVER SIDE
 *
 */
export async function getServerSideProps({ req }) {
  return {
    props: {
      data: null,
    },
  };
}

/**
 *
 * HELLO COMPONENT
 *
 */
class HelloComp extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={cn(style['comphello'])}>
        <div className={cn(style['comphello-textarea'])}>
          <div className={cn(style['comphello-textarea-title'])}>
            Hello{' '}
            {this.context.state.auth
              ? this.context.state.user.username + '!'
              : null}
          </div>
          <span className={cn(style['comphello-textarea-desc'])}>
            {this.context.state.auth
              ? "It's good to see you again."
              : "It's good to see you."}
          </span>
        </div>

        <img
          className={cn(style['comphello-manimg'])}
          src="/man.png"
          alt="man"
          title="Man"
        />
      </div>
    );
  }
}

/**
 *
 * * * PAGE
 *
 */
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
        <UserLayout
          element={
            <section className={cn('section', style['sectiondash'])}>
              <div className={cn(style['sectiondash-left'])}>
                <HelloComp />
              </div>
              <div className={cn(style['sectiondash-right'])}></div>
            </section>
          }
        />
      </>
    );
  }
}

export default Home;

//test
