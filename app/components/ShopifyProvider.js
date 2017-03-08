import React, { Component } from 'react'

class ShopifyProvider extends Component {

  getChildContext = () => {
    return { shopify: this.props.shopify }
  }

  render = () => {
    return <div>{this.props.children}</div>
  }
}

ShopifyProvider.childContextTypes = {
  shopify: React.PropTypes.object,
}

export default ShopifyProvider
