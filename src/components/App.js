import React, { useState } from 'react'
import AppRouter from 'components/Router'
import { BrowserRouter } from 'react-router-dom'
import fbase from 'fbase'

function App() {
  const auth = fbase.auth()

  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser)
  return (
    <>
      <BrowserRouter>
        <AppRouter isLoggendIn={isLoggedIn} />
      </BrowserRouter>
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default App
