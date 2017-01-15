import 'babel-polyfill'

import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'

import Routes from 'components/Routes'

window.onload = () => {
  let root = document.createElement(`div`)
  document.body.appendChild(root)

  ReactDOM.render(
    <div>
      <Router history={browserHistory}>
        { Routes }
      </Router>
    </div>,
    root
  )
}
