
import React from 'react'

const withCanTouch = (WrappedComponent) => {
  return class extends React.Component {
    isTouch = false
    touchTimer = null
    state = {
      canTouch: false,
    }

    addTouch = () => {
      clearTimeout(this.touchTimer)
      this.isTouch = true
      this.touchTimer = setTimeout(() => {
        this.isTouch = false
      }, 1000)
      if (!this.state.canTouch) {
        this.setState({ canTouch: true })
      }
    }

    removeTouch = () => {
      if (!this.isTouch && this.state.canTouch) {
        this.setState({ canTouch: false })
      }
    }

    render = () => {
      return (
        <div onTouchStart={this.addTouch} onMouseOver={this.removeTouch}>
          <WrappedComponent canTouch={this.state.canTouch} {...this.props} />
        </div>
      )
    }
  }
}

export default withCanTouch
