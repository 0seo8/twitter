import React, { useState } from 'react'

function Auth() {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  })

  const changeInputHandler = (e) => {
    const { name, value } = e.target

    setUserInput({
      ...userInput,
      [name]: value,
    })
  }

  const loginHandler = (e) => {
    e.preventDefault()
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
        <input type="submit" value="LogIn" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth
