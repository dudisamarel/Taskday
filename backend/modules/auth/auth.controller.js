const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        // console.log("err", err)
        // res.redirect("localhost:3000/sign");
        res.status(401).send(err.message)
    }
}

async function signup(req, res) {
    try {
        const { username, password, fullname } = req.body
        const addedUsername = await authService.signup(username, password, fullname)
        logger.info(`auth.route - new account created: ${addedUsername}`)
        req.session.user = addedUsername
        res.json(addedUsername)
    } catch (err) {
        res.status(401).send(err.message)
    }
}

async function logout(req, res) {
    try {
        req.session.destroy()
        res.send('Logged out successfully')
    } catch (err) {
        res.status(500).send('Failed to logout')
    }
}

module.exports = {
    login,
    signup,
    logout
}