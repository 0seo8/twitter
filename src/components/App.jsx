import React, { useState, useEffect } from 'react'
import AppRouter from 'components/Router'
import { BrowserRouter } from 'react-router-dom'
import { authService } from 'fbase'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true) //만약 init이 false라면 라우터를 숨길수 있기에 true
    })
  }, [])

  return (
    <>
      <BrowserRouter>
        {init ? (
          <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
        ) : (
          'Initializing...'
        )}
      </BrowserRouter>
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default App
