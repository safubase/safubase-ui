// MODULES
import React from 'react';
import cn from 'classnames';
import axios from 'axios';

// COMPONENTS
import Head from '../components/head';
import UserLayout from '../components/layouts/user';

// COMPONENTS > ICONS
import IconSearch from '../components/icons/search';
import IconNotification from '../components/icons/notification';
import IconArrow from '../components/icons/arrow';
import IconLoading from '../components/icons/loading';

// CONTEXT
import { Context } from '../context';

// UTILS
import UTILS from '../utils';
import UTILS_API from '../utils/api';

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
 * SERVER SIDE data processing layer, But it is better to do the math calculations in client side.
 *
 */
export async function getServerSideProps({ req }) {
  const latest_audits = [
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

  sort_audits_by_date(latest_audits);

  // humanize created at value
  for (let i = 0; i < latest_audits.length; i++) {
    latest_audits[i].created_at = new Date(latest_audits[i].created_at)
      .toISOString()
      .split('T')[0];
  }

  return {
    props: {
      latest_audits: latest_audits,
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
class CompLastAdts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all',
      audits: props.data,
      animation: false,
    };

    this.audits_ref = React.createRef();

    this.animate = this.animate.bind(this);
  }

  animate() {
    if (!this.state.animation) {
      return;
    }

    this.audits_ref.current.children[0].classList.add(
      style['complastadts-audits-itemani']
    );

    setTimeout(() => {
      let ani_class = '';

      const class_list = this.audits_ref.current.children[0].classList;

      for (let i = 0; i < class_list.length; i++) {
        if (class_list[i].includes('complastadts-audits-itemani')) {
          // include param must be included in the class name in css
          ani_class = class_list[i];
        }
      }

      if (!ani_class) {
        return;
      }

      class_list.remove(ani_class);

      this.setState({
        ...this.state,
        animation: false,
      });
    }, 1000);
  }

  componentDidUpdate() {
    this.animate();
  }

  componentDidMount() {
    // Fetch latest audits once in a while
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
        animation: true,
      });
    }, this.props.interval);
  }

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

        <div ref={this.audits_ref} className={cn(style['complastadts-audits'])}>
          {this.state.audits.map((curr, index) => {
            return (
              <div
                key={index}
                className={cn(
                  style['complastadts-audits-item'],
                  index % 2 === 0
                    ? style['complastadts-audits-itemwhitebg']
                    : null
                )}
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
                  VIEW
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
 * PROFILE & INPUT ON RIGHT COMPONENT
 *
 *
 * */
class CompProfileInput extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      search_value: '',
      address: '',
    };
  }

  componentDidUpdate() {
    if (!this.context.state.wallet.address && this.state.address) {
      this.setState({
        ...this.state,
        address: '',
      });

      return;
    }

    if (this.context.state.wallet.address && !this.state.address) {
      let address = this.context.state.wallet.address;

      address =
        address[0] +
        address[1] +
        address[2] +
        address[3] +
        '...' +
        address[address.length - 3] +
        address[address.length - 2] +
        address[address.length - 1];

      this.setState({
        ...this.state,
        address: address,
      });
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div className={cn(style['compprofileinput'])}>
        <div className={cn(style['compprofileinput-left'])}>
          <div className={cn(style['compprofileinput-left-input'])}>
            <IconSearch />

            <input
              value={this.state.search_value}
              onChange={(e) => {
                this.setState({
                  ...this.state,
                  search_value: e.target.value,
                });
              }}
              placeholder="Search..."
            />
          </div>

          <div className={cn(style['compprofileinput-left-profile'])}>
            <div
              className={cn(
                style['compprofileinput-left-profile-notification']
              )}
            >
              <IconNotification />
            </div>
          </div>
        </div>

        <div className={cn(style['compprofileinput-right'])}>
          <a
            href="https://pinksale.finance"
            target="_blank"
            className={cn(style['compprofileinput-right-buynow'])}
          >
            <div className={cn(style['compprofileinput-right-buynow-top'])}>
              <span
                className={cn(style['compprofileinput-right-buynow-top-token'])}
              >
                SAFUBASE
              </span>

              <span
                className={cn(style['compprofileinput-right-buynow-top-price'])}
              >
                Presale
              </span>
            </div>

            <div
              className={cn(
                style['compprofileinput-right-buynow-bottom-title']
              )}
            >
              BUY NOW
            </div>
          </a>

          <button
            className={cn(style['compprofileinput-right-conwallet'])}
            onClick={() => {
              UTILS.wallet_connect({ chain_id: 56 }, this.context);
            }}
          >
            {this.state.address || 'Connect Wallet'}
          </button>
        </div>
      </div>
    );
  }
}

/**
 *
 * WHALEE TRACKER COMPONENT
 *
 */
class CompWhaleTracker extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      info_main_hover: false,
      chains_dd_open: false,
      chain: {
        // selected chain
        img: '/bnb_chain.png',
        name: 'BNB Chain',
        chain: 'bsc',
        chain_id: 56,
      },
      chains: [
        {
          img: '/bnb_chain.png',
          name: 'BNB Chain',
          chain: 'bsc',
          chain_id: 56,
        },
        { img: '/eth.png', name: 'Ethereum', chain: 'eth', chain_id: 1 },
        {
          img: '/polygon.png',
          name: 'Polygon',
          chain: 'polygon',
          chain_id: null,
        },
        {
          img: '/avalanche.png',
          name: 'Avalanche',
          chain: 'avalanche',
          chain_id: null,
        },
        {
          img: '/fantom.png',
          name: 'Fantom',
          chain: 'fantom',
          chain_id: null,
        },
      ],
      api_data: [],
      api_loading: true,
    };
  }

  componentDidUpdate() {}

  componentDidMount() {
    axios
      .get('https://api.safubase.com/v1/blockchain/whales?chain=bsc')
      .then((res) => {
        this.setState({
          ...this.state,
          chains: [...this.state.chains],
          api_data: res.data,
          api_loading: false,
        });
      });
  }

  render() {
    return (
      <div className={cn(style['compwhaletracker'])}>
        <div className={cn(style['compwhaletracker-config'])}>
          <div className={cn(style['compwhaletracker-config-title'])}>
            Whales Tracker
            <div
              onMouseOver={() => {
                this.setState({
                  ...this.state,
                  info_main_hover: true,
                });
              }}
              onMouseLeave={() => {
                this.setState({
                  ...this.state,
                  info_main_hover: false,
                });
              }}
              className={cn(style['compwhaletracker-config-title-i'])}
            >
              ⓘ
              <div
                className={cn(
                  style['compwhaletracker-config-title-i-modal'],
                  this.state.info_main_hover
                    ? style['compwhaletracker-config-title-i-modalactive']
                    : null
                )}
              >
                The latest big trades performed by whales accros every
                integrated blockchain.
              </div>
            </div>
          </div>

          <div className={cn(style['compwhaletracker-config-chaindd'])}>
            <div
              onClick={() => {
                // toggle dropdown
                this.setState({
                  ...this.state,
                  chains_dd_open: !this.state.chains_dd_open,
                });
              }}
              className={cn(style['compwhaletracker-config-chaindd-selected'])}
            >
              <img src={this.state.chain.img} />{' '}
              {this.state.chains_dd_open ? (
                <IconArrow dir="up" />
              ) : (
                <IconArrow dir="down" />
              )}
            </div>

            <div
              className={cn(
                style['compwhaletracker-config-chaindd-options'],
                this.state.chains_dd_open
                  ? style['compwhaletracker-config-chaindd-optionsactive']
                  : null
              )}
            >
              {this.state.chains.map((curr, index) => {
                return (
                  <div
                    key={index}
                    className={cn(
                      style['compwhaletracker-config-chaindd-options-item']
                    )}
                    onClick={async () => {
                      this.setState({
                        ...this.state,
                        chains: [...this.state.chains],
                        chains_dd_open: false,
                        api_data: [...this.state.api_data],
                        api_loading: true,
                      });

                      const res = await UTILS_API.blockchain_get_whales(
                        curr.chain,
                        1,
                        this.context
                      );

                      if (res === null) {
                        return;
                      }

                      this.setState({
                        ...this.state,
                        chains: [...this.state.chains],
                        chain: curr,
                        chains_dd_open: false,
                        api_data: res.data,
                        api_loading: false,
                      });
                    }}
                  >
                    <img src={curr.img} />

                    <div
                      className={cn(
                        style[
                          'compwhaletracker-config-chaindd-options-item-name'
                        ]
                      )}
                    >
                      {curr.name}
                    </div>

                    <input
                      className={cn(
                        style[
                          'compwhaletracker-config-chaindd-options-item-check'
                        ]
                      )}
                      type="checkbox"
                      checked={this.state.chain.name === curr.name}
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={cn(style['compwhaletracker-titles'])}>
          <div className={cn(style['compwhaletracker-titles-name'])}>Token</div>

          <div className={cn(style['compwhaletracker-titles-amount'])}>
            Amount
          </div>

          <div className={cn(style['compwhaletracker-titles-maker'])}>
            Maker
          </div>
        </div>

        <div className={cn(style['compwhaletracker-rows'])}>
          {this.state.api_loading ? (
            <div className={cn(style['compwhaletracker-rows-loading'])}>
              <IconLoading />
            </div>
          ) : (
            this.state.api_data.map((curr, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    style['compwhaletracker-rows-row'],
                    curr.type === 'sell'
                      ? style['compwhaletracker-rows-rowredbg']
                      : style['compwhaletracker-rows-rowgreenbg']
                  )}
                >
                  <div
                    className={cn(
                      style['compwhaletracker-rows-row-imgnamesymbol']
                    )}
                  >
                    <img src={curr.icon} />

                    <div
                      className={cn(
                        style[
                          'compwhaletracker-rows-row-imgnamesymbol-namesymbol'
                        ]
                      )}
                    >
                      <div
                        className={cn(
                          style[
                            'compwhaletracker-rows-row-imgnamesymbol-namesymbol-symbol'
                          ]
                        )}
                      >
                        {curr.token}
                      </div>
                      <div
                        className={cn(
                          style[
                            'compwhaletracker-rows-row-imgnamesymbol-namesymbol-name'
                          ]
                        )}
                      >
                        {curr.token_name}
                      </div>
                    </div>
                  </div>

                  <div
                    className={cn(
                      style['compwhaletracker-rows-row-amount'],
                      curr.type === 'sell'
                        ? style['compwhaletracker-rows-row-amountred']
                        : style['compwhaletracker-rows-row-amountgreen']
                    )}
                  >
                    $
                    {UTILS.num_add_commas(
                      (curr.priceUSD * curr.tokenQuantity).toFixed(2)
                    )}
                  </div>

                  <div
                    onClick={async () => {
                      await UTILS.str_copy(curr.maker);
                    }}
                    className={cn(style['compwhaletracker-rows-row-maker'])}
                  >
                    {curr.maker[0] +
                      curr.maker[1] +
                      curr.maker[2] +
                      curr.maker[3] +
                      '..' +
                      curr.maker[curr.maker.length - 4] +
                      curr.maker[curr.maker.length - 3] +
                      curr.maker[curr.maker.length - 2] +
                      curr.maker[curr.maker.length - 1]}
                  </div>
                </div>
              );
            })
          )}
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

  componentDidUpdate() {}

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

                  <CompLastAdts
                    data={this.props.latest_audits}
                    interval={100000}
                  />
                </div>

                <div className={cn(style['sectiondash-right'])}>
                  <CompProfileInput />

                  <div className={cn(style['sectiondash-right-boxes'])}>
                    <div className={cn(style['sectiondash-right-boxes-box'])}>
                      <div
                        className={cn(
                          style['sectiondash-right-boxes-box-title']
                        )}
                      >
                        11
                      </div>

                      <div
                        className={cn(
                          style['sectiondash-right-boxes-box-desc']
                        )}
                      >
                        Lorem ipsum dolor
                      </div>
                    </div>

                    <div className={cn(style['sectiondash-right-boxes-box'])}>
                      <div
                        className={cn(
                          style['sectiondash-right-boxes-box-title']
                        )}
                      >
                        6
                      </div>

                      <div
                        className={cn(
                          style['sectiondash-right-boxes-box-desc']
                        )}
                      >
                        Lorem ipsum dolor
                      </div>
                    </div>

                    <div className={cn(style['sectiondash-right-boxes-box'])}>
                      <div
                        className={cn(
                          style['sectiondash-right-boxes-box-title']
                        )}
                      >
                        6
                      </div>

                      <div
                        className={cn(
                          style['sectiondash-right-boxes-box-desc']
                        )}
                      >
                        Lorem ipsum dolor
                      </div>
                    </div>
                  </div>

                  <CompWhaleTracker />
                </div>
              </section>
            </>
          }
        />
      </>
    );
  }
}

export default Home;
