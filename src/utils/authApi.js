import firebase from './firebase'

export const _signUp = (email, password, username, avatarURL) => {
    return new Promise((resolve, reject) => {
        // User is signing up
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userCredintial => {
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
                                // Now updating the user with username and stored avatar url
                                userCredintial.user.updateProfile({
                                    displayName: username,
                                    photoURL: url
                                })
                                    .then(() => {
                                        resolve({ email, password, username, url })
                                        // todo: Loading end
                                    })
                                    .catch(err => {
                                        reject(err)
                                    })
                            })
                            .catch(err => reject(err))
                    })
                    .catch(err => reject(err))
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const _signIn = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(userCredintial => {
                console.log(userCredintial)
                resolve(userCredintial)
                // todo: Loading end
            })
            .catch(err => {
                console.log(err)
                reject(err)
                // todo: Loading end
            })
    })
}

export const _logout = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut()
            .then(() => resolve())
            .catch(err => reject(err))
    })
}