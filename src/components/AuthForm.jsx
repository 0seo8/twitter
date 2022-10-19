import React, { useState } from 'react'
import { authService } from 'fbase'

const AuthForm = () => {
  const [error, setError] = useState('')
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  })
  const [newAccount, setNewAccount] = useState(false)
  const changeInputHandler = (e) => {
    const { name, value } = e.target

    setUserInput({
      ...userInput,
      [name]: value,
    })
  }

  const { email, password } = userInput

  const loginHandler = async (e) => {
    let data
    e.preventDefault()
    try {
      if (newAccount) {
        //create account
        data = await authService.createUserWithEmailAndPassword(email, password)
      } else {
        // login
        data = await authService.signInWithEmailAndPassword(email, password)
      }
      console.log(data)
    } catch (error) {
      setError(error.message)
    }
  }

  const toggleAccount = () => {
    setNewAccount((prev) => !prev)
  }
  return (
    <>
      <form onSubmit={loginHandler} className="container">
        <input
          placeholder="Email"
          required
          name="email"
          value={userInput.email}
          onChange={changeInputHandler}
          className="authInput"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={userInput.password}
          onChange={changeInputHandler}
          className="authInput"
        />
        <input
          type="submit"
          value={newAccount ? 'Create Account' : 'Log In'}
          className="authInput authSubmit"
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? 'Log In' : 'Create Account'}
      </span>
    </>
  )
}

export default AuthForm
