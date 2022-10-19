import firebase from 'firebase/compat/app'
//auth를 사용하고 싶은 경우
import 'firebase/compat/auth'
//파이어베이스 데이터베이스 사용
import 'firebase/compat/firestore'
//파이어베이스 스토로지
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
}

firebase.initializeApp(firebaseConfig)

const firebaseInstance = firebase

export const authService = firebase.auth()
// db사용
export const dbService = firebase.firestore()
//buket
export const storageService = firebase.storage()

export default firebaseInstance
