import React, { useState } from 'react'
import { authService } from 'fbase'
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth'

function Auth() {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  })

  const [newAccount, setNewAccount] = useState(false)
  const [error, setError] = useState('')

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

  const onSocialClick = async (event) => {
    console.log('click!')
    const {
      target: { name },
    } = event
    let provider
    if (name === 'google') {
      provider = new GoogleAuthProvider()
    } else if (name === 'github') {
      provider = new GithubAuthProvider()
    }
    const data = await signInWithPopup(authService, provider)
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={loginHandler}>
        <input
          placeholder="Email"
          required
          name="email"
          value={userInput.email}
          onChange={changeInputHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={userInput.password}
          onChange={changeInputHandler}
        />
        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
        {error}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? 'Log In' : 'Create Account'}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  )
}

export default Auth
