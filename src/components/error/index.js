// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Head from '../../components/head';
import UserLayout from '../../components/layouts/user';

// STYLES
import style from './style.module.css';

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Head title="safubase" desc="safubase" />
        <main>
          <section className={cn('section', style['sectionerror'])}>
            <div className={cn(style['sectionerror-ctr'])}>
              <div className={cn(style['sectionerror-ctr-title'])}>
                {this.props.status_code}
              </div>

              <div className={cn(style['sectionerror-ctr-desc'])}>
                {this.props.status_code === 404
                  ? "Sorry, couldn't find the page you are looking for."
                  : null}
              </div>

              <a className={cn(style['sectionerror-ctr-homebtn'])} href="/">
                Go home
              </a>
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default Error;
