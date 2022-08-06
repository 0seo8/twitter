# FireBase

- Firebase 와 AWS ampify 테스트 용으로 사용하는 것을 권장.

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

### 2-5 Auth 문구설정
