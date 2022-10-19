import React, { useState, useEffect } from 'react'
import AppRouter from 'components/Router'
import { BrowserRouter } from 'react-router-dom'
import { authService } from 'fbase'

function App() {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        })
      } else {
        setUserObj(null)
      }
      setInit(true) //만약 init이 false라면 라우터를 숨길수 있기에 true
    })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    })
  }

  return (
    <>
      <BrowserRouter>
        {init ? (
          <AppRouter
            refreshUser={refreshUser}
            isLoggedIn={Boolean(userObj)}
            userObj={userObj}
          />
        ) : (
          'Initializing...'
        )}
      </BrowserRouter>
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default App
