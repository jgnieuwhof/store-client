
import React from 'react'

import Footer from 'components/Footer'
import Header from 'components/Header'

let App = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <div className="body">
        { children }
      </div>
      <Footer />
    </div>
  )
}

export default App
