import { httpService, storageService } from '../../../shared';
import axios from 'axios';

const BASE_URL = 'http://localhost:3030/api/user';

const STORAGE_KEY = 'loggedinUser'

export const userService = {
    getLoggedinUser,
    login,
    signup,
    logout,
    getUserById
    , getUsernames
}

async function getUsernames(filter) {
    try {
        const users = await httpService.get('user', null, { filter })
        return users
    }
    catch (err) {
        throw err.message;
    }
}

async function login(credentials) {
    try {
        const user = await httpService.post('user/login', credentials)
        if (!user) return Error("Some error occurred")
        return _handleLogin(user);
    }
    catch (err) {
        throw err.message;
    }
}

async function signup(credentials) {
    try {
        const user = await httpService.post('user/signup', credentials)
        if (!user) return Error("Some error occurred")
        return _handleLogin(user);
    }
    catch (err) {
        throw err.message;
    }
}
async function logout() {
    try {
        const res = await httpService.post(`user/logout`);
        storageService.clear();
        return res
    }
    catch (err) {
        throw err.message;
    }
}

function getUserById(id) {
    return axios.get(`${BASE_URL}/user/${id}`)
        .then(res => res.data)
        .then((user) => {
            return user
        })
}

function getLoggedinUser() {
    return storageService.load(STORAGE_KEY)
}

function _handleLogin(user) {
    storageService.store(STORAGE_KEY, user)
    return user
}