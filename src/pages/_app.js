// MODULES
import React from 'react';
import cn from 'classnames';

// CONTEXT
import { Provider } from '../context';

// STYLES
import '../styles/index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Provider>
        <this.props.Component {...this.props.pageProps} />
      </Provider>
    );
  }
}

export default App;
