import React, { useEffect } from 'react'

import M from 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css'

const App = () => {
  useEffect(() => {
    // Initialize Materialize CSS
    M.AutoInit()
  }, [])

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}

export default App