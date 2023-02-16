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
class CompHello extends React.Component {
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

class CompInput extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      dd_open: false, // dropdown open
      address: '',
      network: {
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/2048px-Binance_Logo.svg.png',
        name: 'Binance Smart Chain',
        chain_id: 56,
      }, // default selected network
      networks: [
        {
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/2048px-Binance_Logo.svg.png',
          name: 'Binance Smart Chain',
          chain_id: 56,
        },
        {
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png',
          name: 'Ethereum Mainnet',
          chain_id: 1,
        },
        {
          img: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
          name: 'Polygon falan filan',
        },
      ],
    };

    this.on_search = this.on_search.bind(this);
  }

  async on_search() {}

  render() {
    return (
      <div className={cn(style['compinput'])}>
        <div className={cn(style['compinput-bg'])}>
          <div className={cn(style['compinput-bg-inputarea'])}>
            <div
              onClick={() => {
                this.setState({
                  ...this.state,
                  dd_open: !this.state.dd_open,
                });
              }}
              className={cn(style['compinput-bg-inputarea-dd'])}
            >
              <img src={this.state.network.img} />
            </div>

            <div
              className={cn(
                style['compinput-bg-inputarea-ddoptions'],
                this.state.dd_open
                  ? style['compinput-bg-inputarea-ddoptionsopen']
                  : null
              )}
            >
              {this.state.networks.map((curr, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      this.setState({
                        ...this.state,
                        network: curr,
                        dd_open: false,
                      });
                    }}
                    className={cn(
                      style['compinput-bg-inputarea-ddoptions-item']
                    )}
                  >
                    <img
                      className={cn(
                        style['compinput-bg-inputarea-ddoptions-item-img']
                      )}
                      src={curr.img}
                    />

                    <div
                      className={cn(
                        style['compinput-bg-inputarea-ddoptions-item-name']
                      )}
                    >
                      {curr.name}
                    </div>
                  </div>
                );
              })}
            </div>

            <input
              className={cn(style['compinput-bg-inputarea-input'])}
              placeholder="0x90741BD5C2c928Ad19a58157987e11b2dE07c15B"
              value={this.state.address}
              onChange={(e) => {
                this.setState({ ...this.state, address: e.target.value });
              }}
            ></input>
          </div>

          <button
            onClick={this.on_search}
            className={cn(style['compinput-bg-btn'])}
          >
            CHECK
          </button>
        </div>
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
            <>
              <section className={cn('section', style['sectiondash'])}>
                <div className={cn(style['sectiondash-left'])}>
                  <CompHello />
                  <div className={cn(style['sectiondash-left-inputarea'])}>
                    <CompInput />
                  </div>
                </div>
                <div className={cn(style['sectiondash-right'])}></div>
              </section>
            </>
          }
        />
      </>
    );
  }
}

export default Home;
