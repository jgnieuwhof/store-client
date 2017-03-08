import React from 'react'
import FontAwesome from 'react-fontawesome'

const Loading = (props) => (
  <div className="full-size center-content">
    <FontAwesome name='spinner' spin size={props.size || `2x`} />
  </div>
)

export default Loading
