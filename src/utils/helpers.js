import profile from '../assets/imgs/profile.png'

function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function formatQuestion({ optionOneText, optionTwoText, author }) {
    return {
        id: generateUID(),
        timestamp: Date.now(),
        author,
        optionOne: {
            votes: [],
            text: optionOneText,
        },
        optionTwo: {
            votes: [],
            text: optionTwoText,
        }
    }
}

export const dummyQuestion = {
    options: { optionOne: { text: '', votes: [] }, optionTwo: { text: '', votes: [] } },
    timestamp: 0,
    authorName: '',
    isAnswered: null,
    avatarURL: profile,
    id: ''
}

export const questionFetch = (questionId, authedUserData, questions, users) => {
    const { id } = authedUserData
    const { author, optionOne, optionTwo } = questions[questionId]
    const { name: authorName, avatarURL } = users[author]
    const isAnswered = users[id].answers[questionId] ? users[id].answers[questionId] : null
    const totalVotes = optionOne.votes.length + optionTwo.votes.length
    const options = { optionOne, optionTwo }

    return {
        options, authorName, isAnswered, avatarURL, id, totalVotes
    }
}