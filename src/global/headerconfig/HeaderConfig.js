import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

/**
 * Header component for changing HTML headers. This is
 * used for tags related for SEO and for page title.
 */

class HeaderConfig extends Component {
  render() {
    const { title } = this.props;

    return (
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
    );
  }
}

export default HeaderConfig;
