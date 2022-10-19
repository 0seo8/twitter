import { Routes, Route } from 'react-router-dom'
import Auth from 'routes/Auth'
import Home from 'routes/Home'
import Navigation from './Navigation'
import Profile from 'routes/Profile'
import React from 'react'

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <React.Fragment>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route
              path="/profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            />
          </React.Fragment>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}

export default AppRouter
