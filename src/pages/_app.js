// MODULES
import React from 'react';
import cn from 'classnames';

// CONTEXT
import { Provider } from '../context';

// COMPONENTS
import Error from '../components/error';

// STYLES
import '../styles/index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.display_app = this.display_app.bind(this);
  }

  display_app() {
    if (this.props.pageProps.statusCode) {
      return <Error status_code={this.props.pageProps.statusCode} />;
    }

    return <this.props.Component {...this.props.pageProps} />;
  }

  componentDidMount() {}

  render() {
    return <Provider>{this.display_app()}</Provider>;
  }
}

export default App;
