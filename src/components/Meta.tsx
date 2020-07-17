import React from 'react';
import { Helmet } from 'react-helmet';

import '../style/global.scss';

export default class Meta extends React.Component {
  public render (): React.ReactElement {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="The official website of @mattmoony. This is the #1 place to find out more about me." />
          <title>MattMoony</title>
          <link rel="canonical" href="https://mattmoony.github.io/" />
        </Helmet>
        {this.props.children}
      </>
    );
  }
}