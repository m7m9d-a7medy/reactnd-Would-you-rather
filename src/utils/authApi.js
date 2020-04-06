import firebase from './firebase'

export const _isSignedIn = () => {
    return new Promise((resolve, reject) => {
        const authData = localStorage.getItem('authData')
        if (authData) {
            resolve(JSON.parse(authData))
        } else {
            resolve(null)
        }
    })
}

export const _signUp = (email, password, username, name, avatarURL) => {
    return new Promise((resolve, reject) => {
        // Check if username exists in the database
        firebase.firestore().doc(`users/${username}`).get()
            .then(doc => {
                if (doc.exists) {
                    const err = { message: 'This username exists already' }
                    reject({ 'Username exists': err })
                } else {
                    // User is signing up
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(userCredential => {
                            // Successfully created the user
                            // Now uploading the avatar picture
                            const storageRef = firebase.storage().ref()
                            const avatarRef = storageRef.child(`users/${username}/avatar.jpg`)

                            avatarRef.putString(avatarURL, 'data_url')
                                .then(res => {
                                    // Uploaded the image successfully
                                    // Now getting the url to download it when we need it
                                    res.ref.getDownloadURL()
                                        .then(url => {
                                            // Fetched url correctly
                                            // Done creating the user
                                            // Now creating a firebase document for the user
                                            userCredential.user.updateProfile({
                                                displayName: username
                                            })
                                                .then(() => {
                                                    const newUser = {
                                                        id: username,
                                                        name: name,
                                                        avatarURL: url,
                                                        answers: {},
                                                        questions: []
                                                    }

                                                    firebase.firestore().doc(`users/${username}`).set(newUser)
                                                        .then(() => resolve(newUser))
                                                        .catch(err => reject({ 'Database Error': err }))

                                                })
                                                .catch(err => reject({ 'User credentials Error': err }))
                                        })
                                        .catch(err => reject({ 'Image url fetch Error': err }))
                                })
                                .catch(err => reject({ 'Image upload Error': err }))
                        })
                        .catch(err => reject({ 'User authentication Error': err }))
                }
            })
            .catch(err => reject({ 'Username check error': err }))

    })
}

export const _signIn = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                // console.log(userCredential.user.displayName)
                firebase.firestore().doc(`users/${userCredential.user.displayName}`).get()
                    .then(userDoc => {
                        // console.log(userDoc)
                        resolve(userDoc.data())
                    })
                    .catch(err => reject({ 'Database Error': err }))
            })
            .catch(err => {
                reject({ 'User authentication Error': err })
            })
    })
}

export const _logout = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut()
            .then(() => resolve())
            .catch(err => reject({ 'User authentication Error': err }))
    })
}