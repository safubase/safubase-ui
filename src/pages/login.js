// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Head from '../components/head';
import Layout_login from '../components/layouts/login';

// COMPONENTS > ICONS
import Icon_profile from '../components/icons/profile';
import Icon_lock from '../components/icons/lock';
import Icon_loading from '../components/icons/loading';

// CONTEXT
import { Context } from '../context';

// UTILS
import UTILS from '../utils/index.js';
import UTILS_API from '../utils/api.js';

// STYLES
import style from '../styles/pages/login.module.css';

/**
 *
 * COMPONENT MODAL LOGIN
 *
 */
class Comp_modal_login extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      api_loading: false,
      input_username: '',
      input_uid: '',
      input_password: '',
    };
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={cn(style['compmodallogin'])}>
        <div className={cn(style['compmodallogin-top'])}>
          <div className={cn(style['compmodallogin-top-logoctr'])}>Log In</div>

          <div className={cn(style['compmodallogin-top-inputctr'])}>
            <Icon_profile />

            <input
              value={this.state.input_uid}
              onChange={(e) => {
                this.setState({
                  ...this.state,
                  input_uid: e.target.value,
                });
              }}
              placeholder="Email or Username..."
            />
          </div>

          <div className={cn(style['compmodallogin-top-inputctr'])}>
            <Icon_lock />

            <input
              value={this.state.input_password}
              onChange={(e) => {
                this.setState({
                  ...this.state,
                  input_password: e.target.value,
                });
              }}
              placeholder="Password..."
            />
          </div>

          <button
            onClick={async () => {
              if (this.state.api_loading) {
                return;
              }

              this.setState({ ...this.state, api_loading: true });

              const api_res_login = await UTILS_API.login(1, {
                uid: this.state.input_uid,
                password: this.state.input_password,
              });

              this.setState({ ...this.state, api_loading: false });

              if (api_res_login === null) {
                this.context.set_state({
                  ...this.context.state,
                  user_auth: false,
                  user_id: null,
                  user_username: null,
                  user_email: null,
                  user_email_verified: null,
                  user_role: null,
                });

                return;
              }

              this.context.set_state({
                ...this.context.state,
                user_auth: true,
                user_id: api_res_login.data._id,
                user_username: api_res_login.data.username,
                user_email: api_res_login.data.email,
                user_email_verified: api_res_login.data.email_verified,
                user_role: api_res_login.data.role,
              });
            }}
            className={cn(
              style['compmodallogin-top-loginbtn'],
              this.state.api_loading
                ? style['compmodallogin-top-loginbtnloading']
                : null
            )}
          >
            {this.state.api_loading ? <Icon_loading /> : 'Log In'}
          </button>

          <a
            href="/signup"
            className={cn(style['compmodallogin-top-forgotlink'])}
          >
            Forgot Password?
          </a>
        </div>

        <div className={cn(style['compmodallogin-bottom'])}>
          Don't have an account? <a href="/signup">Create one</a>
        </div>
      </div>
    );
  }
}

/**
 *
 * PAGE
 *
 */
class Login extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};

    this.init = this.init.bind(this);
  }

  async init() {
    const context_state = {
      ...this.context.state,
      ui_toasts: [],
    };

    /**
     *
     * ASYNC PROMISE CALLS
     *
     */ // [get_profile(), another_async_func()]
    const api_responses = await Promise.all([UTILS_API.get_profile(1)]);
    const api_res_profile = api_responses[0];

    if (api_res_profile && api_res_profile.data) {
      window.location.replace('https://safubase.com');
      return;
    } else {
      context_state.user_auth = false;
      context_state.user_id = null;
      context_state.user_username = null;
      context_state.user_email = null;
      context_state.user_email_verified = null;
      context_state.user_role = null;
    }

    /*
     *
     * CONTEXT UPDATE
     *
     */
    this.context.set_state(context_state);
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <>
        <Head
          title="Safubase.com | Blockchain Security with AI"
          desc="Contract audit and investment security with artificial intelligence. Safubase is a security company."
        />

        <Layout_login>
          <>
            <section className={cn('section', style['sectionlogin'])}>
              <Comp_modal_login />
            </section>
          </>
        </Layout_login>
      </>
    );
  }
}

export default Login;
