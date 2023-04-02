// MODULES
import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Html lang="en">
        <Head />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
