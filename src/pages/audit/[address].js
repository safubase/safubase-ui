// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Head from '../../components/head';
import Layout_user from '../../components/layouts/user';

// CONTEXT
import { Context } from '../../context';

// UTILS
import UTILS from '../../utils/index.js';

// STYLES
import style from '../../styles/pages/audit.module.css';

/**
 *
 * CIRCLE COMPONENT
 *
 */
class Comp_circle extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      CANVAS_WIDTH: 300,
      CANVAS_HEIGHT: 300,
      ARC_R: 100,
      LINE_WIDTH: 30,
    };

    this.draw = this.draw.bind(this);

    this.ctr_ref = React.createRef();
    this.info_ref = React.createRef();
  }

  draw(ctx) {
    const FPS = parseInt(1000 / 60); // Interval update milliseconds
    const DPI_PERCENTS = (Math.PI * 2) / 100; // Double pi percents
    const SCORE = this.props.data; // Token score which came from server
    const V = 0.035; // velocity of the circle drawing, velocity and FPS are related since they draw the circle together
    const V_COLOR_TRANS = 4; // velocity of the RGB Color transition of stroke style

    // Stroke RGB numbers
    const STROKE_STYLE_LOW_SECURITY = [230, 76, 60];
    const STROKE_STYLE_MEDIUM_SECURITY = [240, 196, 16];
    const STROKE_STYLE_HIGH_SECURITY = [60, 204, 112];

    const STROKE_STYLE_CURRENT = [...STROKE_STYLE_LOW_SECURITY];

    let angle_current = 0;
    const ANGLE_END = DPI_PERCENTS * SCORE;

    const ANGLE_LOW_SECURITY_OFFSET = DPI_PERCENTS * 49; // Low security score mapped to double pi
    const ANGLE_MID_SECURITY_OFFSET = DPI_PERCENTS * 84; // Middle security score mapped to double pi

    let angle_mid_security_passed = false;
    let angle_high_security_passed = false;

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

      // Determine the color according to score
      if (angle_current < ANGLE_LOW_SECURITY_OFFSET) {
      }

      if (
        angle_current > ANGLE_LOW_SECURITY_OFFSET &&
        angle_current < ANGLE_MID_SECURITY_OFFSET &&
        !angle_mid_security_passed
      ) {
        // After circle passed the mid security score

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
            this.state.ARC_R,
            0,
            angle_current
          );

          ctx.stroke();

          if (
            STROKE_STYLE_CURRENT[0] === STROKE_STYLE_MEDIUM_SECURITY[0] &&
            STROKE_STYLE_CURRENT[1] === STROKE_STYLE_MEDIUM_SECURITY[1] &&
            STROKE_STYLE_CURRENT[2] === STROKE_STYLE_MEDIUM_SECURITY[2]
          ) {
            clearInterval(TIMER_COLOR_FADE);
            return;
          }
        }, FPS);

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
            this.state.ARC_R,
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
        }, FPS / 2);

        angle_high_security_passed = true;
      }

      ctx.beginPath();

      ctx.clearRect(0, 0, this.state.CANVAS_WIDTH, this.state.CANVAS_HEIGHT);

      ctx.arc(
        this.state.CANVAS_WIDTH / 2,
        this.state.CANVAS_HEIGHT / 2,
        this.state.ARC_R,
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
    // Config html elements style according to canvas scale
    const ctr_div = this.ctr_ref.current;

    ctr_div.style.width = this.state.CANVAS_WIDTH + 'px';
    ctr_div.style.height = this.state.CANVAS_HEIGHT + 'px';

    const frame_div = ctr_div.children[0];
    const canvas = ctr_div.children[1];

    frame_div.style.width = this.state.ARC_R * 2 + this.state.LINE_WIDTH + 'px';
    frame_div.style.height =
      this.state.ARC_R * 2 + this.state.LINE_WIDTH + 'px';

    frame_div.style.borderWidth = this.state.LINE_WIDTH + 'px';

    const ctx = canvas.getContext('2d');

    ctx.lineWidth = this.state.LINE_WIDTH;
    //ctx.lineCap = 'round';
    ctx.strokeStyle = '#e64c3c';

    // Start drawing of canvas circle
    this.draw(ctx);
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
 * PAGE
 *
 */
class Home extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <>
        <Head
          title="Safubase.com | Blockchain Security with AI"
          desc="Contract audit and investment security with artificial intelligence. Safubase is a security company."
        />

        <Layout_user>
          <>
            <section className={cn('section', style['sectionaudit'])}>
              <Comp_circle data={85} />
            </section>
          </>
        </Layout_user>
      </>
    );
  }
}

export default Home;
