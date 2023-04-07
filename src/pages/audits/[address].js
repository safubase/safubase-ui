// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Head from '../../components/head';
import Layout_user from '../../components/layouts/user';

// COMPONENTS > ICONS
import Icon_chart from '../../components/icons/chart/index.js';

// CONTEXT
import { Context } from '../../context';

// UTILS
import UTILS from '../../utils/index.js';
import UTILS_API from '../../utils/api.js';

// STYLES
import style from '../../styles/pages/audits.module.css';

/**
 *
 * SERVER SIDE data processing layer, But it is better to do the math calculations in client side.
 *
 */
export async function getServerSideProps({ req, query }) {
  if (!query.address || !query.chain_id) {
    return {
      props: {
        code: 'ERR_BAD_REQUEST',
        message: 'Address or chain id is invalid',
      },
    };
  }

  const api_res_blockchain_audit = await UTILS_API.blockchain_audit(1, {
    address: query.address.toLowerCase(),
    chain_id: query.chain_id,
  });

  if (api_res_blockchain_audit.code) {
    return {
      props: api_res_blockchain_audit,
    };
  }

  return {
    props: api_res_blockchain_audit.data,
  };
}

/**
 *
 * CIRCLE COMPONENT
 * Will be used in other components because it is little complex by state
 *
 */
class Comp_circle extends React.Component {
  static contextType = Context;

  constructor(props) {
    // Initialization

    // ONLY EDIT THESE 3 VALUES
    const CANVAS_WIDTH = 180;
    const CANVAS_HEIGHT = 180;
    const LINE_WIDTH = 26;
    const R = CANVAS_WIDTH / 2 - LINE_WIDTH / 2; // formula of maximum radius without losing content

    super(props);
    this.state = {
      CANVAS_WIDTH: CANVAS_WIDTH,
      CANVAS_HEIGHT: CANVAS_HEIGHT,
      LINE_WIDTH: LINE_WIDTH,
      R: R,
    };

    // functions
    this.setup = this.setup.bind(this);
    this.draw = this.draw.bind(this);

    // References of html elements
    this.ctr_ref = React.createRef();
    this.info_ref = React.createRef();
  }

  setup() {
    // Config html elements style and canvas
    const ctr_div = this.ctr_ref.current; // ctr_div stands for container div of the component which has compcircle container class

    ctr_div.style.width = this.state.CANVAS_WIDTH + 'px';
    ctr_div.style.height = this.state.CANVAS_HEIGHT + 'px';

    const frame_div = ctr_div.children[0];
    const canvas = ctr_div.children[1];

    frame_div.style.width = this.state.R * 2 + this.state.LINE_WIDTH + 'px';
    frame_div.style.height = this.state.R * 2 + this.state.LINE_WIDTH + 'px';

    frame_div.style.borderWidth = this.state.LINE_WIDTH + 'px';

    const ctx = canvas.getContext('2d');

    //ctx.lineCap = 'round';
    ctx.lineWidth = this.state.LINE_WIDTH;
    ctx.strokeStyle = '#e64c3c';

    ctx.clearRect(0, 0, this.state.CANVAS_WIDTH, this.state.CANVAS_HEIGHT);

    return ctx;
  }

  draw(ctx) {
    /**
     * 
      First we declare global constant and normal variables, then we  interval the canvas path draw with the given configurations, at each security score (current angle passes the 49% percent of double pi) we initialize the color transition intervals. Even though main circle draw interval is done the color transition intervals will keep drawing the circle and color transition. So it does not matter what speed we set the color transition velocity
     *
     */

    // These interval config values can be edited
    const FPS = parseInt(1000 / 40); // Interval update milliseconds
    const FPS_COLOR_TRANS = parseInt(1000 / 60);
    const V = 0.08; // velocity of the circle drawing, velocity and FPS are related since they draw the circle together
    const V_COLOR_TRANS = 2.5; // velocity of the RGB Color transition of stroke style

    // Stroke RGB numbers, herbiji
    const STROKE_STYLE_LOW_SECURITY = [230, 76, 60];
    const STROKE_STYLE_MEDIUM_SECURITY = [240, 196, 16];
    const STROKE_STYLE_HIGH_SECURITY = [60, 204, 112];

    const STROKE_STYLE_CURRENT = [...STROKE_STYLE_LOW_SECURITY];

    let angle_current = 0;
    // Determine the end angle by multiplying props data by double pi mapped to 100%
    const ANGLE_END = ((Math.PI * 2) / 100) * this.props.data;
    const ANGLE_LOW_SECURITY_OFFSET = ((Math.PI * 2) / 100) * 49; // Low security score mapped to double pi
    const ANGLE_MID_SECURITY_OFFSET = ((Math.PI * 2) / 100) * 84; // Middle security score mapped to double pi

    let angle_mid_security_passed = false;
    let angle_high_security_passed = false;

    // Start drawing the circle progress
    const TIMER_MAIN = setInterval(() => {
      if (angle_current >= ANGLE_END) {
        clearInterval(TIMER_MAIN);

        return;
      }

      // update the current angle by velocity
      if (angle_current + V >= ANGLE_END) {
        angle_current = ANGLE_END;
      } else {
        angle_current = angle_current + V;
      }

      /**
       * Initialize the color transition interval after they passed specific security score
       */

      if (
        angle_current > ANGLE_LOW_SECURITY_OFFSET &&
        angle_current < ANGLE_MID_SECURITY_OFFSET &&
        !angle_mid_security_passed
      ) {
        // After circle passed the low security score

        const TIMER_COLOR_FADE = setInterval(() => {
          // Current rgb colors
          const CURRENT_RED = STROKE_STYLE_CURRENT[0];
          const CURRENT_GREEN = STROKE_STYLE_CURRENT[1];
          const CURRENT_BLUE = STROKE_STYLE_CURRENT[2];

          // Middle security colors
          const NEXT_RED = STROKE_STYLE_MEDIUM_SECURITY[0];
          const NEXT_GREEN = STROKE_STYLE_MEDIUM_SECURITY[1];
          const NEXT_BLUE = STROKE_STYLE_MEDIUM_SECURITY[2];

          if (NEXT_RED !== CURRENT_RED && NEXT_RED > CURRENT_RED) {
            STROKE_STYLE_CURRENT[0] += V_COLOR_TRANS;

            if (STROKE_STYLE_CURRENT[0] >= NEXT_RED) {
              STROKE_STYLE_CURRENT[0] = NEXT_RED;
            }
          } else if (NEXT_RED !== CURRENT_RED && NEXT_RED < CURRENT_RED) {
            STROKE_STYLE_CURRENT[0] -= V_COLOR_TRANS;

            if (STROKE_STYLE_CURRENT[0] <= NEXT_RED) {
              STROKE_STYLE_CURRENT[0] = NEXT_RED;
            }
          }

          if (NEXT_GREEN !== CURRENT_GREEN && NEXT_GREEN > CURRENT_GREEN) {
            STROKE_STYLE_CURRENT[1] += V_COLOR_TRANS;

            if (STROKE_STYLE_CURRENT[1] >= NEXT_GREEN) {
              STROKE_STYLE_CURRENT[1] = NEXT_GREEN;
            }
          } else if (
            NEXT_GREEN !== CURRENT_GREEN &&
            NEXT_GREEN < CURRENT_GREEN
          ) {
            STROKE_STYLE_CURRENT[1] -= V_COLOR_TRANS;

            if (STROKE_STYLE_CURRENT[1] <= NEXT_GREEN) {
              STROKE_STYLE_CURRENT[1] = NEXT_RED;
            }
          }

          if (NEXT_BLUE !== CURRENT_BLUE && NEXT_BLUE > CURRENT_BLUE) {
            STROKE_STYLE_CURRENT[2] += V_COLOR_TRANS;

            if (STROKE_STYLE_CURRENT[2] >= NEXT_BLUE) {
              STROKE_STYLE_CURRENT[2] = NEXT_BLUE;
            }
          } else if (NEXT_BLUE !== CURRENT_BLUE && NEXT_BLUE < CURRENT_BLUE) {
            STROKE_STYLE_CURRENT[2] -= V_COLOR_TRANS;

            if (STROKE_STYLE_CURRENT[2] <= NEXT_BLUE) {
              STROKE_STYLE_CURRENT[2] = NEXT_BLUE;
            }
          }

          ctx.strokeStyle = `rgba(${STROKE_STYLE_CURRENT[0]}, ${STROKE_STYLE_CURRENT[1]}, ${STROKE_STYLE_CURRENT[2]})`;
          ctx.beginPath();

          ctx.clearRect(
            0,
            0,
            this.state.CANVAS_WIDTH,
            this.state.CANVAS_HEIGHT
          );

          ctx.arc(
            this.state.CANVAS_WIDTH / 2,
            this.state.CANVAS_HEIGHT / 2,
            this.state.R,
            0,
            angle_current
          );

          ctx.stroke();

          if (
            (STROKE_STYLE_CURRENT[0] === STROKE_STYLE_MEDIUM_SECURITY[0] &&
              STROKE_STYLE_CURRENT[1] === STROKE_STYLE_MEDIUM_SECURITY[1] &&
              STROKE_STYLE_CURRENT[2] === STROKE_STYLE_MEDIUM_SECURITY[2]) ||
            angle_high_security_passed
          ) {
            clearInterval(TIMER_COLOR_FADE);

            return;
          }
        }, FPS_COLOR_TRANS);

        angle_mid_security_passed = true;
      }

      if (
        angle_current > ANGLE_MID_SECURITY_OFFSET &&
        !angle_high_security_passed
      ) {
        // After circle passed the high security score
        const TIMER_COLOR_FADE = setInterval(() => {
          // Current rgb colors
          const CURRENT_RED = STROKE_STYLE_CURRENT[0];
          const CURRENT_GREEN = STROKE_STYLE_CURRENT[1];
          const CURRENT_BLUE = STROKE_STYLE_CURRENT[2];

          // Middle security colors
          const NEXT_RED = STROKE_STYLE_HIGH_SECURITY[0];
          const NEXT_GREEN = STROKE_STYLE_HIGH_SECURITY[1];
          const NEXT_BLUE = STROKE_STYLE_HIGH_SECURITY[2];

          if (NEXT_RED !== CURRENT_RED && NEXT_RED > CURRENT_RED) {
            STROKE_STYLE_CURRENT[0] += V_COLOR_TRANS;

            if (STROKE_STYLE_CURRENT[0] >= NEXT_RED) {
              STROKE_STYLE_CURRENT[0] = NEXT_RED;
            }
          } else if (NEXT_RED !== CURRENT_RED && NEXT_RED < CURRENT_RED) {
            STROKE_STYLE_CURRENT[0] -= V_COLOR_TRANS;

            if (STROKE_STYLE_CURRENT[0] <= NEXT_RED) {
              STROKE_STYLE_CURRENT[0] = NEXT_RED;
            }
          }

          if (NEXT_GREEN !== CURRENT_GREEN && NEXT_GREEN > CURRENT_GREEN) {
            STROKE_STYLE_CURRENT[1] += V_COLOR_TRANS;

            if (STROKE_STYLE_CURRENT[1] >= NEXT_GREEN) {
              STROKE_STYLE_CURRENT[1] = NEXT_GREEN;
            }
          } else if (
            NEXT_GREEN !== CURRENT_GREEN &&
            NEXT_GREEN < CURRENT_GREEN
          ) {
            STROKE_STYLE_CURRENT[1] -= V_COLOR_TRANS;

            if (STROKE_STYLE_CURRENT[1] <= NEXT_GREEN) {
              STROKE_STYLE_CURRENT[1] = NEXT_GREEN;
            }
          }

          if (NEXT_BLUE !== CURRENT_BLUE && NEXT_BLUE > CURRENT_BLUE) {
            STROKE_STYLE_CURRENT[2] += V_COLOR_TRANS;

            if (STROKE_STYLE_CURRENT[2] >= NEXT_BLUE) {
              STROKE_STYLE_CURRENT[2] = NEXT_BLUE;
            }
          } else if (NEXT_BLUE !== CURRENT_BLUE && NEXT_BLUE < CURRENT_BLUE) {
            STROKE_STYLE_CURRENT[2] -= V_COLOR_TRANS;

            if (STROKE_STYLE_CURRENT[2] <= NEXT_BLUE) {
              STROKE_STYLE_CURRENT[2] = NEXT_BLUE;
            }
          }

          ctx.strokeStyle = `rgba(${STROKE_STYLE_CURRENT[0]}, ${STROKE_STYLE_CURRENT[1]}, ${STROKE_STYLE_CURRENT[2]})`;
          ctx.beginPath();
          ctx.clearRect(
            0,
            0,
            this.state.CANVAS_WIDTH,
            this.state.CANVAS_HEIGHT
          );
          ctx.arc(
            this.state.CANVAS_WIDTH / 2,
            this.state.CANVAS_HEIGHT / 2,
            this.state.R,
            0,
            angle_current
          );
          ctx.stroke();

          if (
            STROKE_STYLE_CURRENT[0] === STROKE_STYLE_HIGH_SECURITY[0] &&
            STROKE_STYLE_CURRENT[1] === STROKE_STYLE_HIGH_SECURITY[1] &&
            STROKE_STYLE_CURRENT[2] === STROKE_STYLE_HIGH_SECURITY[2]
          ) {
            clearInterval(TIMER_COLOR_FADE);
            return;
          }
        }, FPS_COLOR_TRANS);

        angle_high_security_passed = true;
      }

      ctx.beginPath();

      ctx.clearRect(0, 0, this.state.CANVAS_WIDTH, this.state.CANVAS_HEIGHT);

      ctx.arc(
        this.state.CANVAS_WIDTH / 2,
        this.state.CANVAS_HEIGHT / 2,
        this.state.R,
        0,
        angle_current
      );

      ctx.stroke();

      // Display current percentage of the circle
      this.info_ref.current.innerHTML =
        parseInt(100 / ((Math.PI * 2) / angle_current)) + '%';
    }, FPS);
  }

  componentDidMount() {
    this.draw(this.setup());
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <div ref={this.ctr_ref} className={cn(style['compcircle'])}>
        <div className={cn(style['compcircle-frame'])}>
          <div className={cn(style['compcircle-frame-shadow'])}></div>
          <div
            ref={this.info_ref}
            className={cn(style['compcircle-frame-info'])}
          ></div>
        </div>
        <canvas
          className={cn(style['compcircle-canvas'])}
          width={this.state.CANVAS_WIDTH}
          height={this.state.CANVAS_HEIGHT}
        ></canvas>
      </div>
    );
  }
}

/**
 *
 * SCORE CARD COMPONENT
 *
 *
 */
class Comp_scores extends React.Component {
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
      <div className={cn(style['compscores'])}>
        <div className={cn(style['compscores-top'])}>
          <div className={cn(style['compscores-top-title'])}>0x123</div>
        </div>
        <div className={cn(style['compscores-bottom'])}>
          <div className={cn(style['compscores-bottom-left'])}>
            <Comp_circle data={87} />

            <div className={cn(style['compscore-bottom-left-improvebtn'])}>
              <Icon_chart /> Improve your security measures
            </div>
          </div>

          <div className={cn(style['compscores-bottom-right'])}>
            <div className={cn(style['compscores-bottom-right-barctr'])}>
              <div
                className={cn(style['compscores-bottom-right-barctr-label'])}
              >
                <span>10</span> Failed
              </div>
              <div className={cn(style['compscores-bottom-right-barctr-bar'])}>
                <div
                  className={cn(
                    style['compscores-bottom-right-barctr-bar-progressfailed']
                  )}
                ></div>
              </div>
            </div>

            <div className={cn(style['compscores-bottom-right-barctr'])}>
              <div
                className={cn(style['compscores-bottom-right-barctr-label'])}
              >
                <span>10</span> Warnings
              </div>
              <div className={cn(style['compscores-bottom-right-barctr-bar'])}>
                <div
                  className={cn(
                    style['compscores-bottom-right-barctr-bar-progressfailed']
                  )}
                ></div>
              </div>
            </div>

            <div className={cn(style['compscores-bottom-right-barctr'])}>
              <div
                className={cn(style['compscores-bottom-right-barctr-label'])}
              >
                <span>10</span> Passed
              </div>
              <div className={cn(style['compscores-bottom-right-barctr-bar'])}>
                <div
                  className={cn(
                    style['compscores-bottom-right-barctr-bar-progressfailed']
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
 * PAGE
 *
 */
class Audits extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};

    console.log(this.props);
  }

  componentDidMount() {
    if (this.props.code) {
      this.context.set_state({
        ...this.context.state,
        ui_toasts: [
          ...this.context.state.ui_toasts,
          {
            type: 'error',
            message: this.props.message,
            created_at: new Date(),
          },
        ],
      });

      return;
    }
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

        <Layout_user>
          <>
            <section className={cn('section', style['sectionaudits'])}>
              <Comp_scores />
            </section>
          </>
        </Layout_user>
      </>
    );
  }
}

export default Audits;
