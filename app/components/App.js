
import React from 'react'

import Header from 'components/Header'

let App = ({ children }) => {
  return (
    <div className="app-container">
      <Header/>
      <div className="body">
        { children }
      </div>
    </div>
  )
}

export default App
