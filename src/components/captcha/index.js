// MODULES
import React from 'react';
import cn from 'classnames';

// CONFIG
import config from '../../config/index.js';

// CONTEXT
import { Context } from '../../context';

class Captcha extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};

    this.form_ref = React.createRef();
  }

  componentDidMount() {
    console.log(this.form_ref.current);
  }

  render() {
    return (
      <form ref={this.form_ref}>
        <div
          className="h-captcha"
          data-sitekey={config.env.CAPTCHA_SITE_KEY}
        ></div>
      </form>
    );
  }
}

export default Captcha;
