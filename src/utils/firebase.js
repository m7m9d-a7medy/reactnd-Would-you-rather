
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCxzKz_1N4r429dcpkvTX5NaXIOgDRmaqo",
    authDomain: "ahmedy-would-you-rather.firebaseapp.com",
    databaseURL: "https://ahmedy-would-you-rather.firebaseio.com",
    projectId: "ahmedy-would-you-rather",
    storageBucket: "ahmedy-would-you-rather.appspot.com",
    messagingSenderId: "987091968540",
    appId: "1:987091968540:web:752612f9fa428d242335d9",
    measurementId: "G-GENSC7HVYY"
}

export const firebaseInit = () => firebase.initializeApp(firebaseConfig)
export default firebase