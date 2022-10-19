import { Routes, Route } from 'react-router-dom'
import Auth from 'routes/Auth'
import Home from 'routes/Home'
import Navigation from './Navigation'
import Profile from 'routes/Profile'

const AppRouter = ({ isLoggedIn }) => {
  return (
    <>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}

export default AppRouter
