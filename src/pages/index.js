// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Head from '../components/head';
import UserLayout from '../components/layouts/user';

// CONTEXT
import { Context } from '../context';

// STYLES
import style from '../styles/pages/home.module.css';

function sort_audits_by_date(data) {
  // order from newly created
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[j + 1]) {
        const current = data[j];
        const next = data[j + 1];

        if (
          new Date(current.created_at).valueOf() <
          new Date(next.created_at).valueOf()
        ) {
          data[j] = next;
          data[j + 1] = current;
        }
      }
    }
  }

  return data;
}

/**
 *
 * SERVER SIDE data processing layer
 *
 */
export async function getServerSideProps({ req }) {
  const data = [
    {
      name: 'oldest',
      symbol: 'ETH',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/2048px-Binance_Logo.svg.png',
      address: '0x123',
      score: 3.4,
      created_at: new Date().toString(),
      network: 'ETH',
    },
    {
      name: 'mid',
      symbol: 'ETH',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/2048px-Binance_Logo.svg.png',
      address: '0x123',
      score: 3.4,
      created_at: new Date(1676903315821 + 1232333).toString(),
      network: 'ETH',
    },
    {
      name: 'newest',
      symbol: 'ETH',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/2048px-Binance_Logo.svg.png',
      address: '0x123',
      score: 3.4,
      created_at: new Date(1676903315821 + 123232322).toString(),
      network: 'ETH',
    },
    {
      name: 'newest newest',
      symbol: 'ETH',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/2048px-Binance_Logo.svg.png',
      address: '0x123',
      score: 3.4,
      created_at: new Date(1676903315821 + 12323232212122).toString(),
      network: 'ETH',
    },
  ];

  sort_audits_by_date(data);

  // humanize created at value
  for (let i = 0; i < data.length; i++) {
    data[i].created_at = new Date(data[i].created_at)
      .toISOString()
      .split('T')[0];
  }

  return {
    props: {
      data: data,
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

/**
 *
 *
 * INPUT COMPONENT
 *
 */
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
            AUDIT
          </button>
        </div>
      </div>
    );
  }
}

/**
 *
 * LATEST AUDITS COMPONENT
 *
 */
class CompLastAdt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all',
      audits: [],
    };
  }

  componentDidUpdate() {}

  componentDidMount() {}

  render() {
    return (
      <div className={cn(style['complastadts'])}>
        <div className={cn(style['comlastadts-title'])}>LATEST AUDITS</div>

        <div className={cn(style['complastadts-cats'])}>
          <div
            onClick={() => {
              this.setState({ ...this.state, category: 'all' });
            }}
            className={cn(
              style['complastadts-cats-item'],
              this.state.category === 'all'
                ? style['complastadts-cats-itemactive']
                : null
            )}
          >
            All Audits
          </div>

          <div
            onClick={() => {
              this.setState({ ...this.state, category: 'bsc' });
            }}
            className={cn(
              style['complastadts-cats-item'],
              this.state.category === 'bsc'
                ? style['complastadts-cats-itemactive']
                : null
            )}
          >
            Binance Smart Chain
          </div>

          <div
            onClick={() => {
              this.setState({ ...this.state, category: 'ethereum' });
            }}
            className={cn(
              style['complastadts-cats-item'],
              this.state.category === 'ethereum'
                ? style['complastadts-cats-itemactive']
                : null
            )}
          >
            Ethereum
          </div>

          <div
            onClick={() => {
              this.setState({ ...this.state, category: 'polygon' });
            }}
            className={cn(
              style['complastadts-cats-item'],
              this.state.category === 'polygon'
                ? style['complastadts-cats-itemactive']
                : null
            )}
          >
            Polygon
          </div>

          <div
            onClick={() => {
              this.setState({ ...this.state, category: 'solana' });
            }}
            className={cn(
              style['complastadts-cats-item'],
              this.state.category === 'solana'
                ? style['complastadts-cats-itemactive']
                : null
            )}
          >
            Solana
          </div>
        </div>

        <div className={cn(style['complastadts-audits'])}>
          {this.props.data.map((curr, index) => {
            return (
              <div
                key={index}
                className={cn(style['complastadts-audits-item'])}
              >
                <div
                  className={cn(
                    style['complastadts-audits-item-imgnamesymbol']
                  )}
                >
                  <div
                    className={cn(
                      style['complastadts-audits-item-imgnamesymbol-img']
                    )}
                  >
                    <img src={curr.img} />
                  </div>

                  <div
                    className={cn(
                      style['complastadts-audits-item-imgnamesymbol-namesymbol']
                    )}
                  >
                    <div
                      className={cn(
                        style[
                          'complastadts-audits-item-imgnamesymbol-namesymbol-symbol'
                        ]
                      )}
                    >
                      {curr.symbol}
                    </div>

                    <div
                      className={cn(
                        style[
                          'complastadts-audits-item-imgnamesymbol-namesymbol-name'
                        ]
                      )}
                    >
                      {curr.name}
                    </div>
                  </div>
                </div>

                <div className={cn(style['complastadts-audits-item-date'])}>
                  {curr.created_at}
                </div>

                <div className={cn(style['complastadts-audits-item-network'])}>
                  {curr.network}
                </div>

                <button className={cn(style['complastadts-audits-item-btn'])}>
                  AUDIT
                </button>
              </div>
            );
          })}
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
    this.state = {
      audits: this.props.data,
    };
  }

  componentDidMount() {
    setInterval(() => {
      const audits = [
        ...this.state.audits,
        {
          name: 'test',
          symbol: 'ETH',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/2048px-Binance_Logo.svg.png',
          address: '0x123',
          score: 3.4,
          created_at: new Date().toISOString().split('T')[0],
          network: 'ETH',
        },
      ];

      sort_audits_by_date(audits);

      this.setState({
        ...this.state,
        audits: audits,
      });
    }, 3000);
  }

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
                    <div
                      className={cn(style['sectiondash-left-inputarea-live'])}
                    >
                      <div
                        className={cn(
                          style['sectiondash-left-inputarea-live-logo']
                        )}
                      >
                        LIVE
                      </div>
                      You can quickly check the
                      <strong> token smart contract</strong> here. This is a
                      quick Audit option.
                    </div>
                    <CompInput />
                  </div>

                  <CompLastAdt data={this.state.audits} />
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
