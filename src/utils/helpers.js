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
    options: [null, null],
    timestamp: 0,
    authorName: '',
    isAnswered: null,
    avatarURL: profile,
    id: ''
}