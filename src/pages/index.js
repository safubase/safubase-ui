// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Head from '../components/head';
import Layout_user from '../components/layouts/user';

// COMPONENTS > ICONS (SVGS)
import Icon_search from '../components/icons/search';
import Icon_notification from '../components/icons/notification';
import Icon_arrow from '../components/icons/arrow';
import Icon_loading from '../components/icons/loading';
import Icon_info from '../components/icons/info';
import Icon_lock from '../components/icons/lock';

// CONTEXT
import { Context } from '../context';

// UTILS
import UTILS from '../utils/index.js';
import UTILS_API from '../utils/api.js';

// STYLES
import style from '../styles/pages/home.module.css';

/**
 *
 * GLOBAL FUNCTIONS, for both serverside and components
 *
 */
function global_sort_audits_by_date(data) {
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
  const audits_latest = [
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

  global_sort_audits_by_date(audits_latest);

  // humanize created at value
  for (let i = 0; i < audits_latest.length; i++) {
    audits_latest[i].created_at = new Date(audits_latest[i].created_at)
      .toISOString()
      .split('T')[0];
  }

  return {
    props: {
      audits_latest: audits_latest,
    },
  };
}

/**
 *
 *
 * HOME PAGE COMPONENTS ***************
 *
 */

/**
 *
 * HELLO COMPONENT
 *
 */
class Comp_hello extends React.Component {
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
          src="/images/man.png"
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
class Comp_input extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      dd_open: false, // dropdown open
      modal_open: false,
      bar_pct: 0, // bar percentage
      bar_info: 'analyzing token credentials',
      address: '',
      network: {
        img: '/bnb_chain.png',
        name: 'BNB Chain',
        chain_id: 56,
      }, // default selected network
      networks: [
        {
          img: '/bnb_chain.png',
          name: 'BNB Chain',
          chain_id: 56,
        },
        {
          img: '/eth.png',
          name: 'Ethereum',
          chain_id: 1,
        },
        {
          img: '/polygon.png',
          name: 'Polygon',
        },
      ],
    };

    this.bar_ref = React.createRef();

    this.api_audit = this.api_audit.bind(this);
    this.modal_init = this.modal_init.bind(this);
  }

  async api_audit() {
    this.modal_init();
  }

  async modal_init() {
    this.setState({
      ...this.state,
      network: { ...this.state.network },
      networks: [...this.state.networks],
      modal_open: true,
    });

    // sleep for state changes otherwise previous setState will be ignored because react is trash
    await UTILS.sleep(250);

    const bar_div = this.bar_ref.current;

    if (!bar_div) {
      return null;
    }

    let total_pct = 0;
    const repeat_len = 4;
    const random_pct_padding = Math.floor(Math.random() * 13 + 5);
    const token_info_index = [
      'analyzing token credentials',
      'checking security measures',
      'detailizing safu information',
      'finalizing results for you...',
    ];

    for (let i = 0; i < repeat_len; i++) {
      const random_pct = Math.floor(Math.random() * 34 + random_pct_padding);

      total_pct = total_pct + random_pct;

      if (total_pct >= 100 || i === repeat_len - 1) {
        total_pct = 99.9;
      }

      this.setState({
        ...this.state,
        modal_open: true,
        bar_pct: total_pct,
        bar_info: token_info_index[i],
      });

      let delay_ms = Math.floor(Math.random() * 1000 + 700);

      bar_div.style.width = total_pct + '%';

      await UTILS.sleep(delay_ms);
    }
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <div className={cn(style['compinput'])}>
        <div className={cn(style['compinput-left'])}>
          <div className={cn(style['compinput-left-logo'])}>LIVE</div>
          You can quickly check the
          <strong> token smart contract</strong> here. This is a quick Audit
          option.
        </div>

        <div className={cn(style['compinput-right'])}>
          <div className={cn(style['compinput-right-bg'])}>
            <div className={cn(style['compinput-right-bg-inputarea'])}>
              <div
                onClick={() => {
                  this.setState({
                    ...this.state,
                    dd_open: !this.state.dd_open,
                  });
                }}
                className={cn(style['compinput-right-bg-inputarea-dd'])}
              >
                <img src={this.state.network.img} />
              </div>

              <div
                className={cn(
                  style['compinput-right-bg-inputarea-ddoptions'],
                  this.state.dd_open
                    ? style['compinput-right-bg-inputarea-ddoptionsopen']
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
                        style['compinput-right-bg-inputarea-ddoptions-item']
                      )}
                    >
                      <img
                        className={cn(
                          style[
                            'compinput-right-bg-inputarea-ddoptions-item-img'
                          ]
                        )}
                        src={curr.img}
                      />

                      <div
                        className={cn(
                          style[
                            'compinput-right-bg-inputarea-ddoptions-item-name'
                          ]
                        )}
                      >
                        {curr.name}
                      </div>

                      <input
                        className={cn(
                          style[
                            'compinput-right-bg-inputarea-ddoptions-item-check'
                          ]
                        )}
                        type="checkbox"
                        checked={this.state.network.name === curr.name}
                        onChange={(e) => {
                          e.preventDefault();
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              <input
                className={cn(style['compinput-right-bg-inputarea-input'])}
                placeholder="0x90741BD5C2c928Ad19a58157987e11b2dE07c15B"
                value={this.state.address}
                onChange={(e) => {
                  this.setState({ ...this.state, address: e.target.value });
                }}
              ></input>
            </div>

            <button
              onClick={this.api_audit}
              className={cn(style['compinput-right-bg-btn'])}
            >
              AUDIT
            </button>
          </div>
        </div>

        <div
          className={cn(
            style['compinput-modal'],
            this.state.modal_open ? style['compinput-modalopen'] : null
          )}
        >
          <div className={cn(style['compinput-modal-content'])}>
            <div className={cn(style['compinput-modal-content-info'])}>
              {this.state.bar_info}
            </div>

            <div
              className={cn(style['compinput-modal-content-progressbarctr'])}
            >
              <div
                className={cn(
                  style['compinput-modal-content-progressbarctr-status']
                )}
              >
                {this.state.bar_pct}% Loading...
              </div>
              <div
                ref={this.bar_ref}
                className={cn(
                  style['compinput-modal-content-progressbarctr-bar']
                )}
              >
                <div
                  className={cn(
                    style[
                      'compinput-modal-content-progressbarctr-bar-reflection'
                    ]
                  )}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 *
 * BOXES COMPONENT
 *
 */
class Comp_boxes extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={cn(style['compboxes'])}>
        <div className={cn(style['compboxes-box'])}>
          <div className={cn(style['compboxes-box-title'])}>11</div>

          <div className={cn(style['compboxes-box-desc'])}>
            Lorem ipsum dolor
          </div>
        </div>

        <div className={cn(style['compboxes-box'])}>
          <div className={cn(style['compboxes-box-title'])}>6</div>

          <div className={cn(style['compboxes-box-desc'])}>
            Lorem ipsum dolor
          </div>
        </div>

        <div className={cn(style['compboxes-box'])}>
          <div className={cn(style['compboxes-box-title'])}>6</div>

          <div className={cn(style['compboxes-box-desc'])}>
            Lorem ipsum dolor
          </div>
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
class Comp_last_adts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all',
      audits: props.data,
      animation: false,
    };

    this.audits_ref = React.createRef();

    this.animate = this.animate.bind(this);
    this.api_get_latest_audits = this.api_get_latest_audits.bind(this);
  }

  animate() {
    if (!this.state.animation) {
      return;
    }

    this.audits_ref.current.children[0].classList.add(
      style['complastadts-audits-itemani']
    );

    // Remove animation class after 1 seconds to clean the state
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

  async api_get_latest_audits() {
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

      audits.length = 5;

      global_sort_audits_by_date(audits);

      this.setState({
        ...this.state,
        audits: audits,
        animation: true,
      });
    }, 10000);
  }

  // Fetches new data in intervals and updates state
  componentDidMount() {
    this.api_get_latest_audits();
  }

  // Adds animation style to the first latest audit bar after every update
  componentDidUpdate() {
    this.animate();
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
 * NEWSLETTER COMPONENT
 *
 *
 */
class Comp_newsletter extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={cn(style['compnewsletter'])}>
        <div className={cn(style['compnewsletter-title'])}>
          Sign up our mailing list to receive our new presales, features, tips
          and reviews for next 100x projects.
        </div>

        <input
          className={cn(style['compnewsletter-input'])}
          placeholder="Enter your email address..."
        />

        <div className={cn(style['compnewsletter-button'])}>Subscribe</div>
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
class Comp_profile_input extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      search_value: '',
      address: '',
    };

    this.address_set = this.address_set.bind(this);
  }

  address_set() {
    if (!this.context.state.wallet_address && this.state.address) {
      this.setState({
        ...this.state,
        address: '',
      });

      return;
    }

    if (this.context.state.wallet_address && !this.state.address) {
      let address = this.context.state.wallet_address;

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

  componentDidUpdate() {
    this.address_set();
  }

  componentDidMount() {}

  render() {
    return (
      <div className={cn(style['compprofileinput'])}>
        <div className={cn(style['compprofileinput-left'])}>
          <div className={cn(style['compprofileinput-left-input'])}>
            <Icon_search />

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
            onClick={async () => {
              const accounts = await UTILS.wallet_connect({ chain_id: 56 });

              this.context.set_state({
                ...this.context.state,
                wallet_address: accounts[0],
              });
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
 * PROFILE & INPUT ON RIGHT COMPONENT
 *
 *
 * */
class Comp_profile_input_mobile extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      search_value: '',
      address: '',
    };

    this.address_set = this.address_set.bind(this);
  }

  address_set() {
    if (!this.context.state.wallet_address && this.state.address) {
      this.setState({
        ...this.state,
        address: '',
      });

      return;
    }

    if (this.context.state.wallet_address && !this.state.address) {
      let address = this.context.state.wallet_address;

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

  componentDidUpdate() {
    this.address_set();
  }

  componentDidMount() {}

  render() {
    return (
      <div className={cn(style['compprofileinputmobile'])}>
        <a
          href="https://pinksale.finance"
          target="_blank"
          className={cn(style['compprofileinputmobile-buynow'])}
        >
          <div className={cn(style['compprofileinputmobile-buynow-top'])}>
            <span
              className={cn(style['compprofileinputmobile-buynow-top-token'])}
            >
              SAFUBASE
            </span>

            <span
              className={cn(style['compprofileinputmobile-buynow-top-price'])}
            >
              Presale
            </span>
          </div>

          <div
            className={cn(style['compprofileinputmobile-buynow-bottom-title'])}
          >
            BUY NOW
          </div>
        </a>

        <button
          className={cn(style['compprofileinputmobile-conwallet'])}
          onClick={async () => {
            const wallet_accounts = await UTILS.wallet_connect({
              chain_id: 56,
            });

            this.context.set_state({
              ...this.context.state,
              wallet_address: wallet_accounts[0],
            });
          }}
        >
          {this.state.address || 'Connect Wallet'}
        </button>
      </div>
    );
  }
}

/**
 *
 * WHALEE TRACKER COMPONENT
 *
 */
class Comp_whale_tracker extends React.Component {
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
      api_loading: false,
      api_updating: false,
    };

    this.str_reduce_row_name_chars = this.str_reduce_row_name_chars.bind(this);
    this.api_update = this.api_update.bind(this);
  }

  str_reduce_row_name_chars(str, offset = 13) {
    let new_str = '';
    const parts = str.split(' ');

    for (let i = 0; i < parts.length; i++) {
      if (new_str.length + parts[i].length <= offset) {
        new_str = new_str + parts[i] + ' ';
      } else {
        break;
      }
    }

    return new_str;
  }

  async api_update(animate = false) {
    if (animate) {
      this.setState({
        ...this.state,
        api_loading: false,
        api_updating: true,
      });
    } else {
      this.setState({
        ...this.state,
        api_loading: true,
        api_updating: false,
      });
    }

    const res = await UTILS_API.blockchain_get_whales(
      1,
      this.state.chain.chain
    );

    if (res === null) {
      return;
    }

    this.setState({
      ...this.state,
      chains: [...this.state.chains],
      api_data: res.data,
      api_loading: false,
      api_updating: false,
    });
  }

  componentDidMount() {
    this.api_update();

    setInterval(() => {
      this.api_update(true);
    }, 25000);
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

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
              <Icon_info />

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
                <Icon_arrow dir="up" />
              ) : (
                <Icon_arrow dir="down" />
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
                        chain: curr,
                        chains: [...this.state.chains],
                        chains_dd_open: false,
                        api_data: [...this.state.api_data],
                        api_loading: true,
                      });

                      const res = await UTILS_API.blockchain_get_whales(
                        1,
                        curr.chain
                      );

                      if (res === null) {
                        return;
                      }

                      this.setState({
                        ...this.state,
                        chains: [...this.state.chains],
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

        <div
          className={cn(
            style['compwhaletracker-rows'],
            this.state.api_updating
              ? style['compwhaletracker-rowsupdating']
              : null
          )}
        >
          {this.state.api_loading ? (
            <div className={cn(style['compwhaletracker-rows-loading'])}>
              <Icon_loading />
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
                        {this.str_reduce_row_name_chars(curr.token_name)}
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
 * UPCOMING UNLOCKS COMPONENT
 *
 */
class Comp_upcoming_unlocks extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      info_main_hover: false,
      api_data: [],
      api_loading: true,
      api_updating: false,
    };

    this.str_reduce_row_name_chars = this.str_reduce_row_name_chars.bind(this);
    this.date_display = this.date_display.bind(this);
    this.api_update = this.api_update.bind(this);
  }

  str_reduce_row_name_chars(str, offset = 13) {
    let new_str = '';
    const parts = str.split(' ');

    for (let i = 0; i < parts.length; i++) {
      if (new_str.length + parts[i].length <= offset) {
        new_str = new_str + parts[i] + ' ';
      } else {
        break;
      }
    }

    return new_str;
  }

  date_display(remaining_s) {
    const remaining_m = parseInt(remaining_s / 60);

    if (remaining_m < 60) {
      return remaining_m + ' minute';
    }

    const remaining_h = parseInt(remaining_m / 60);

    if (remaining_h < 24) {
      return remaining_h + ' hours';
    }

    const remaining_d = parseInt(remaining_h / 24);

    return remaining_d + ' days';
  }

  async api_update(animate = false) {
    if (animate) {
      this.setState({
        ...this.state,
        api_loading: false,
        api_updating: true,
      });
    } else {
      this.setState({
        ...this.state,
        api_loading: true,
        api_updating: false,
      });
    }

    const res = await UTILS_API.blockchain_get_upcoming_unlocks(
      1,
      this.context
    );

    if (res === null) {
      return;
    }

    this.setState({
      ...this.state,
      api_data: res.data,
      api_loading: false,
      api_updating: false,
    });
  }

  componentDidMount() {
    this.api_update();

    setInterval(() => {
      this.api_update(true);
    }, 45000);
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={cn(style['compupcomingunlocks'])}>
        <div className={cn(style['compupcomingunlocks-config'])}>
          <div className={cn(style['compupcomingunlocks-config-title'])}>
            Upcoming Token Unlocks
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
              className={cn(style['compupcomingunlocks-config-title-i'])}
            >
              <Icon_info />

              <div
                className={cn(
                  style['compupcomingunlocks-config-title-i-modal'],
                  this.state.info_main_hover
                    ? style['compupcomingunlocks-config-title-i-modalactive']
                    : null
                )}
              >
                The nearest token unlocks events, sorted by date
              </div>
            </div>
          </div>
        </div>

        <div className={cn(style['compupcomingunlocks-titles'])}>
          <div className={cn(style['compupcomingunlocks-titles-name'])}>
            Token
          </div>

          <div className={cn(style['compupcomingunlocks-titles-amount'])}>
            Amount
          </div>

          <div className={cn(style['compupcomingunlocks-titles-date'])}>
            Date
          </div>
        </div>

        <div
          className={cn(
            style['compupcomingunlocks-rows'],
            this.state.api_updating
              ? style['compupcomingunlocks-rowsupdating']
              : null
          )}
        >
          {this.state.api_loading ? (
            <div className={cn(style['compupcomingunlocks-rows-loading'])}>
              <Icon_loading />
            </div>
          ) : (
            this.state.api_data.map((curr, index) => {
              return (
                <a
                  key={index}
                  className={cn(style['compupcomingunlocks-rows-row'])}
                  href={'https://bscscan.com/address/' + curr.token_id}
                  target="_blank"
                >
                  <div
                    className={cn(
                      style['compupcomingunlocks-rows-row-imgnamesymbol']
                    )}
                  >
                    <img src={curr.icon} />

                    <div
                      className={cn(
                        style[
                          'compupcomingunlocks-rows-row-imgnamesymbol-namesymbol'
                        ]
                      )}
                    >
                      <div
                        className={cn(
                          style[
                            'compupcomingunlocks-rows-row-imgnamesymbol-namesymbol-symbol'
                          ]
                        )}
                      >
                        {curr.symbol}
                      </div>

                      <div
                        className={cn(
                          style[
                            'compupcomingunlocks-rows-row-imgnamesymbol-namesymbol-name'
                          ]
                        )}
                      >
                        {this.str_reduce_row_name_chars(curr.name)}
                      </div>
                    </div>
                  </div>

                  <div
                    className={cn(style['compupcomingunlocks-rows-row-amount'])}
                  >
                    <div
                      className={cn(
                        style[
                          'compupcomingunlocks-rows-row-amount-lockedamount'
                        ]
                      )}
                    >
                      <Icon_lock />

                      <span>{UTILS.num_shorten(curr.locked_supply)}</span>

                      <span
                        className={cn(
                          style[
                            'compupcomingunlocks-rows-row-amount-lockedamount-percentage'
                          ]
                        )}
                      >
                        (
                        {(
                          curr.locked_supply /
                          (curr.total_supply / 100)
                        ).toFixed(2)}
                        %)
                      </span>
                    </div>

                    <div
                      className={cn(
                        style['compupcomingunlocks-rows-row-amount-usd']
                      )}
                    >
                      $
                      {UTILS.num_add_commas(
                        (curr.usd_price * curr.locked_supply).toFixed(2)
                      )}
                    </div>
                  </div>

                  <div
                    className={cn(style['compupcomingunlocks-rows-row-date'])}
                  >
                    {this.date_display(
                      curr.unlock_date - parseInt(Date.now() / 1000)
                    )}
                  </div>
                </a>
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
      context_state.user_auth = true;
      context_state.user_id = api_res_profile.data._id;
      context_state.user_username = api_res_profile.data.username;
      context_state.user_email = api_res_profile.data.email;
      context_state.user_email_verified = api_res_profile.data.email_verified;
      context_state.user_role = api_res_profile.data.role;
    } else {
      context_state.user_auth = false;
      context_state.user_id = null;
      context_state.user_username = null;
      context_state.user_email = null;
      context_state.user_email_verified = null;
      context_state.user_role = null;
    }

    /**
     *
     * WALLET CONFIG
     *
     */
    UTILS.wallet_add_listeners(this.context);
    const wallet_accounts = await UTILS.wallet_req_accounts();

    if (wallet_accounts[0]) {
      context_state.wallet_address = wallet_accounts[0];
    }

    /**
     *
     * CONTEXT UPDATE
     *
     */
    this.context.set_state(context_state);
  }

  /**
   *
   * PAGE INIT, event listener registrations, update wallet, many more
   *
   */
  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {
    console.log(this.context.state);
  }

  componentWillUnmount() {}

  render() {
    return (
      <>
        <Head
          title="Safubase.com | Blockchain Security with AI"
          desc="Contract audit and investment security with artificial intelligence. Safubase is a security company."
        />

        <Layout_user>
          <>
            <section className={cn('section', style['sectiondash'])}>
              <div className={cn(style['sectiondash-left'])}>
                <Comp_profile_input_mobile />
                <Comp_hello />
                <Comp_input />
                <Comp_last_adts data={this.props.audits_latest} />
                <Comp_newsletter />
              </div>

              <div className={cn(style['sectiondash-right'])}>
                <Comp_profile_input />
                <Comp_whale_tracker />
                <Comp_upcoming_unlocks />
              </div>
            </section>
          </>
        </Layout_user>
      </>
    );
  }
}

export default Home;
