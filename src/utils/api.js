import firebase from './firebase'

export const storeLocalUsers = users => {
    for (const user of Object.keys(users)) {
        console.log(user)

        firebase.firestore()
            .doc(`users/${user}`)
            .set(users[user])
            .then(res => console.log(res))
    }
}

export const storeLocalQuestions = questions => {
    for (const question of Object.keys(questions)) {
        console.log(question)

        firebase.firestore()
            .doc(`questions/${question}`)
            .set(questions[question])
            .then(res => console.log(res))
    }
}

export const _getUsers = () => {
    return new Promise((res, rej) => {
        const users = {}
        firebase.firestore()
            .collection('users')
            .get()
            .then(response => {
                for (const doc of response.docs) {
                    users[doc.id] = doc.data()
                }
                res(users)
            })
            .catch(err => rej(err))
    })
}

export const _getQuestions = () => {
    return new Promise((res, rej) => {
        const questions = {}
        firebase.firestore()
            .collection('questions')
            .get()
            .then(response => {
                for (const doc of response.docs) {
                    questions[doc.id] = doc.data()
                }
                res(questions)
            })
            .catch(err => rej(err))
    })
}

export const _saveQuestion = (formattedQuestion, author) => {
    return new Promise((res, rej) => {
        const authedUser = author;

        let promises = []
        const questionsPromise = firebase.firestore()
            .doc(`questions/${formattedQuestion.id}`)
            .set(formattedQuestion)
        promises.push(questionsPromise)

        const usersPromise = firebase.firestore()
            .doc(`users/${authedUser}`)
            .update({
                questions: firebase.firestore.FieldValue.arrayUnion(formattedQuestion)
            })
        promises.push(usersPromise)

        Promise.all(promises)
            .then(() => res(formattedQuestion))
            .catch(err => rej(err))
    })
}

export const _saveQuestionAnswer = ({ authedUser, qid, answer }) => {
    return new Promise((res, rej) => {
        let promises = []
        let userData = {}
        let questionData = {}

        firebase.firestore().doc(`users/${authedUser}`).get()
            .then(resp => {
                userData = resp.data()
                // console.log(`[Firestore data of ${authedUser}]`, userData)
                const updatedUserData = {
                    ...userData,
                    answers: {
                        ...userData.answers,
                        [qid]: answer
                    }
                }

                const promise1 = firebase.firestore().doc(`users/${authedUser}`).set(updatedUserData)
                promises.push(promise1)
            })
            .catch(err => rej(err))


        firebase.firestore().doc(`questions/${qid}`).get()
            .then(resp => {
                questionData = resp.data()
                // console.log(`[Firestore data of ${qid}]`, questionData)

                const updatedQuestionData = {
                    ...questionData,
                    [answer]: {
                        ...questionData[answer],
                        votes: questionData[answer].votes.concat([authedUser])
                    }
                }


                const promise2 = firebase.firestore().doc(`questions/${qid}`).set(updatedQuestionData)
                promises.push(promise2)
            })
            .catch(err => rej(err))

        Promise.all(promises)
            .then(() => res)
            .catch(err => rej(err))
    })
}