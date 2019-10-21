import firebase from 'firebase'
require('firebase/firestore')

var config = {
  apiKey: 'AIzaSyDPi-_9_Wepvv61D7kdqYqa2DhaSO7c9lE',
  authDomain: 'getstuffdone-82116.firebaseapp.com',
  databaseURL: 'https://getstuffdone-82116.firebaseio.com',
  projectId: 'getstuffdone-82116',
  storageBucket: 'getstuffdone-82116.appspot.com',
  messagingSenderId: '753994790272',
}

firebase.initializeApp(config)
let db = firebase.firestore()


export default db
