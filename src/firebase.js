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
