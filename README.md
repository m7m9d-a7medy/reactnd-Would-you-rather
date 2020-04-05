# MyReads Project
This is Would you rather? Project for Udacity React Nanodegree program.  

To get started:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## [Folder structure]
TL;DR warning :D
```bash
├── package.json
├── public
|  ├── favicon.ico
|  ├── index.html
|  ├── logo192.png
|  ├── logo512.png
|  ├── manifest.json
|  └── robots.txt
├── README.md
├── src
|  ├── assets
|  |  └── imgs
|  |     ├── logo.png
|  |     └── profile.png
|  ├── components
|  |  ├── App.js
|  |  ├── hoc
|  |  |  ├── asyncComponent.js
|  |  |  └── ErrorBoundary.js
|  |  ├── Layout
|  |  |  ├── CurrentUser
|  |  |  |  └── CurrentUser.js
|  |  |  ├── Layout.js
|  |  |  ├── Layout.module.css
|  |  |  ├── Loading
|  |  |  |  ├── Loading.js
|  |  |  |  └── Loading.module.css
|  |  |  └── Navigation
|  |  |     └── Navigation.js
|  |  ├── pages
|  |  |  ├── Auth
|  |  |  |  ├── Auth.js
|  |  |  |  ├── Auth.module.css
|  |  |  |  └── ImageInput
|  |  |  |     └── ImageInput.js
|  |  |  ├── Dashboard
|  |  |  |  ├── Dashboard.js
|  |  |  |  ├── Dashboard.module.css
|  |  |  |  └── QuestionCard
|  |  |  |     ├── QuestionCard.js
|  |  |  |     └── QuestionCard.module.css
|  |  |  ├── Leaderboard
|  |  |  |  ├── Leaderboard.js
|  |  |  |  └── UserCard
|  |  |  |     ├── UserCard.js
|  |  |  |     └── UserCard.module.css
|  |  |  ├── NewQuestion
|  |  |  |  ├── NewQuestion.js
|  |  |  |  └── NewQuestion.module.css
|  |  |  └── Question
|  |  |     ├── NotFound.js
|  |  |     ├── Question.js
|  |  |     └── Question.module.css
|  |  └── UI
|  |     ├── Backdrop
|  |     |  ├── Backdrop.js
|  |     |  └── Backdrop.module.css
|  |     └── Modal
|  |        ├── Modal.js
|  |        └── Modal.module.css
|  ├── index.css
|  ├── index.js
|  ├── store
|  |  ├── actions
|  |  |  ├── actionTypes.js
|  |  |  ├── auth.js
|  |  |  ├── error.js
|  |  |  ├── questions.js
|  |  |  ├── redirection.js
|  |  |  └── shared.js
|  |  ├── middleware
|  |  |  ├── index.js
|  |  |  └── logger.js
|  |  └── reducers
|  |     ├── auth.js
|  |     ├── error.js
|  |     ├── index.js
|  |     ├── loading.js
|  |     ├── questions.js
|  |     ├── redirection.js
|  |     └── users.js
|  └── utils
|     ├── api.js
|     ├── authApi.js
|     ├── firebase.js
|     ├── helpers.js
|     └── _DATA.js
└── yarn.lock
```

## How to use
This application is a recreation of the Would you rather game. The user is able to answer polls created by other users, as well as creating their own polls. There's also a leaderboard of users.

### Additional features
- Adding new users
- Authentication with a true backend
- Loading indicator with Redux
- Error Handling with Redux

### Video
You can see it in action **[here](https://youtu.be/79JZG0A5r08)**.
A live version of the project is available at https://ahmedy-would-you-rather.firebaseapp.com/