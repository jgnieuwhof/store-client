
import React, { Component } from 'react'

class UploadButton extends Component {
  state = {
    filename: null,
  }

  onChange = (e) => {
    let { onChange } = this.props
    this.setState({ filename: e.target.files[0].name })
    onChange && onChange()
  }

  render() {
    let { label, name } = this.props
    return (
      <label className="btn btn-default">
        <span>{ this.state.filename || label || `Upload a file` }</span>
        <input type="file" name={name} onChange={this.onChange} hidden />
      </label>
    )
  }
}

export default UploadButton
