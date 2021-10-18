const { requireAuth } = require('./middlewares/requireAuth.middleware')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const app = express()
const http = require('http').createServer(app)

const session = expressSession({
    name: 'SessionCookie',
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})
// Express App Config
app.use(cookieParser())
app.use(bodyParser.json())
app.use(session)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:3030'],
        credentials: true

    }
    app.use(cors(corsOptions))
}

const authRoutes = require('./modules/auth/auth.routes')
const boardRoutes = require('./modules/board/boardRoutes')
const userRoutes = require('./modules/user/user.routes')
// const { connectSockets } = require('./services/socket.service')


// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/board', requireAuth, boardRoutes)
app.use((err, req, res, next) => {
    if (err.status == 404) {
        res.status(404).send(err.message)
    }
    else
        res.status(err.status).end(err.message)

})

// connectSockets(http, session)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3000/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow react-router to take it from there
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
    // logger.info('Server is running on port: ' + port)
    console.log('Server is running on port: ' + port)
})




