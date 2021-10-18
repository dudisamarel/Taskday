const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')


async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)
    const user = await userService.getByUsername(username)
    if (!user)
        throw new Error('User does not exist!')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
        throw new Error('Password is incorrect!')
    return { _id: user._id, username: user.username, fullname: user.fullname }
}

async function signup(username, password, fullname) {

    const saltRounds = 10
    logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
    if (!username || !password || !fullname) throw new Error('fullname, username and password are required!')
    const existUser = await userService.isExist(username)
    if (!existUser) {
        const hash = await bcrypt.hash(password, saltRounds)
        return userService.add({ username, password: hash, fullname })
    }
    else
        throw new Error('Username exists')


}

module.exports = {
    signup,
    login,
}