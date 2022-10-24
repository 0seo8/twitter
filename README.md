# FireBase

- Firebase 와 AWS ampify 테스트 용으로 사용하는 것을 권장

> Firebase v9 & react-router-dom 업데이트 이슈 해결

```sh
$ npm i firebase@9.6.1
$ npm i react-router-dom@5.3.0
```

## 1. 프로젝트 시작

- 프로젝트 생성
- github연동
- firebase 프로젝트 시작

### 1-1 firebase settings

```shell
$ yarn add firebase
```

`firebase.js`

```js
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP__PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
}

export default firebase.initializeApp(firebaseConfig)
```

### 1-2 .env 설정

cra로 리액트 프로젝트를 시작한 경우, `.env` 설정 시 `REACT_APP`으로 시작하는 환경변수를 설정해줘야합니다.

```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGIN_ID=
REACT_APP_APP_ID=
```

### 1-3 라우터설정

![](https://velog.velcdn.com/images/0seo8/post/9a6c86a6-b86a-47f6-9042-f0ae6f419e0a/image.png)

`Router.js`

```js
import { Routes, Route } from 'react-router-dom'
import Auth from '../routes/Auth'
import Home from '../routes/Home'

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/" element={<Auth />} />
      )}
    </Routes>
  )
}

export default AppRouter
```

`App.js`

```js
import React, { useState } from 'react'
import AppRouter from './Router'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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
```

## 2 Auth설정

### 2-1 import auth

`firebase.js`

```js
import 'firebase/compat/auth'
```

`App.js`

```js
import firebase from '../firebase'
```

### 2-2 경로설정 [import 'firebase/compat/auth'](https://create-react-app.dev/docs/importing-a-component#absolute-imports)

`jsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

`App.js`

```js
import AppRouter from 'components/Router'

//with firebase.js 이름 변경
import firebase from 'fbase'
```

### 2-3 [파베 auth로그인 설정](https://firebase.google.com/docs/auth/web/firebaseui?hl=ko#handling_anonymous_user_upgrade_merge_conflicts)

`firebase.auth().crrentUser `로 현재 로그인 여부를 확인할 수 있습니다. 이렇게 얻은 값을 useState로 관리를 해주면 됩니다.

### 2-4 Authentication 설정

sign-in-method에서 수동으로 설정을 해줘야합니다.

\*github연동
github settings - developer settings - OAuth Apps

### 2-5 firebase Auth

[**createWithEmailAndPassword**](https://firebase.google.com/docs/reference/js/auth.md?authuser=0&hl=ko#createuserwithemailandpassword)

- 지정된 전자 메일 주소 및 암호와 연결된 새 사용자 계정 생성
- 사용자 계정이 성공적으로 생성 시, 로그인 가능
- 계정이 이미 존재하거나 유효하지 않은경우 생성실패
- ※이메일 주소는 사용자 고유 식별자 역할을 합니다.

```
export declare function createUserWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential>;
```

[**signInWithEmailAndPassword**](https://firebase.google.com/docs/reference/js/auth.md?authuser=0&hl=ko#signinwithemailandpassword)

- 이메일과 비밀번호를 사용하여 비동기식으로 로그인합니다.
- 이메일 주소와 비밀번호가 일치하지 않으면 오류와 함께 실패합니다.

```
export declare function signInWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential>;
```

### 2-6 로그인 여부 확인

```js
function Auth() {
  const [newAccount, setNewAccount] = useState(false)

  const loginHandler = (e) => {
    e.preventDefault()
    if (newAccount) {
      //create account
    } else {
      // login
    }
  }

  return (
    <form onSubmit={loginHandler}>
      <input type="text" ... />
      <input type="email" ... />
      <input type="submit" value={ newAccount ? "Create Account" : "Log In" } />✅
    </form>
  )
}
```

### 2-7 계정생성 및 로그인

```js
import { authService } from 'fbase'

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
    console.log(error)
  }
}
```

- 계정생성시
  ![](https://velog.velcdn.com/images/0seo8/post/6d305e36-f32a-4bd3-b4bb-8b7fecdd4d2e/image.png)

- 로그인이 된 경우
- ![](https://velog.velcdn.com/images/0seo8/post/bc1ee246-b770-413b-8a16-1160757d43e3/image.png)

### 2-7 [persistance](https://firebase.google.com/docs/reference/js/auth.md?authuser=0&hl=ko#setpersistence)

현재 저장된 Auth 세션에 대한 인증 인스턴스의 지속성 유형을 변경하고 리디렉션 요청을 사용한 로그인을 포함하여 향후 로그인 요청에 대해 이 유형의 지속성을 적용합니다.

로그인하는 사용자가 세션을 기억해야 하는지 여부를 쉽게 지정할 수 있습니다. 또한 다른 사용자가 공유하거나 민감한 데이터가 있는 애플리케이션에 대해 Auth 상태를 유지하지 않는 것이 더 쉽습니다.

- local
- session
- none

##### + PLUS

현재 localstorㅁge에 저장되고 있음에도 로그인을 진행해야한다 왜?

- 어플리케이션이 로드될 때 firebase가 초기화되고 모든걸 로드할 때까지 기다려줄 수 없기 때문에 로그아웃이 진행된다.

`검증해보기`

```js
const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)

console.log(authService.currentUser)

setInterval(() => {
  console.log(authService.currentUser)
}, 2000)
```

![](https://velog.velcdn.com/images/0seo8/post/a276a511-a6ed-4caa-ad26-507db1a6ba36/image.png)

처음에는 null이 찍혔다가 로그인 정보가 찎히는 것을 확인할 수 있습니다.

**따라서 처음부터 useState(authService.currentUser)로 넣어줘서는 안됩니다.**

### 2-8 ⭐useEffect와 onAuthStateChanged

`onAuthStateChanged`는 사용자의 로그인 상태의 변화를 관찰하는 관찰자를 추가시킵니다. 즉, 유저상태의 변화가 있을 때(로그아웃, 계정생성, firebase가 초기화될때) 실행됩니다.

```js
const [init, setInit] = useState(false)
const [isLoggedIn, setIsLoggedIn] = useState(false)

useEffect(() => {
  authService.onAuthStateChanged((user) => {
    if (user) {
      setIsLoggedIn(true)
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
        <AppRouter isLoggedIn={Boolean(isLoggedIn)} userObj={isLoggedIn} />
      ) : (
        'Initializing...'
      )}
    </BrowserRouter>
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
  </>
)
```

### 2-9 로그인 로직의 에러처리

```js
  const [error, setError] = useState('')

...
    } catch (error) {
      setError(error.message)
    }
...
  {error}
</form>
```

### 2-10 setNewAccount 설정

```js
  const toggleAccount = (prev) => {
    setNewAccount((prev) => !prev)
  }
  ...
  </form>
  <span onClick={toggleAccount}>
    {newAccount ? 'Log In' : 'Create Account'}
  </span>
```

### 2-11 Social Login

[signInWithPopup](https://firebase.google.com/docs/reference/js/auth.md?authuser=0&hl=ko#signinwithpopup)
팝업 기반 OAuth 인증 흐름을 사용하여 Firebase 클라이언트를 인증합니다.

성공하면 공급자의 자격 증명과 함께 로그인한 사용자를 반환합니다. 로그인에 실패한 경우 오류에 대한 추가 정보가 포함된 오류 개체를 반환합니다.

```js
import firebaseInstance, { authService } from 'fbase'

const onSocialClick = async (event) => {
  console.log('click!')
  const {
    target: { name },
  } = event
  let provider
  if (name === 'google') {
    provider = new firebaseInstance.auth.GoogleAuthProvider()
  } else if (name === 'github') {
    provider = new firebaseInstance.auth.GithubAuthProvider()
  }
  const data = await authService.signInWithPopup(provider)
  console.log(data)
}

<button onClick={onSocialClick} name="google">Continue with Google</button>
<button onClick={onSocialClick} name="github">Continue with Github</button>
```
