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
  apiKey: 'AIzaSyBeaR0K5kelHin5c4mS6tUreY2XaNVl4wU',
  authDomain: 'nwitter-f25f0.firebaseapp.com',
  projectId: 'nwitter-f25f0',
  storageBucket: 'nwitter-f25f0.appspot.com',
  messagingSenderId: '687490272857',
  appId: '1:687490272857:web:387f5493bac7d4640beb48',
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
