const boardService = require('./boardService')

module.exports = {
    getBoard,
    getBoards,
    deleteBoard,
    updateBoard,
    addBoard,
    addMemberToBoard
}
async function getBoards(req, res) {
    try {
        const filterBy = {
            _id: req.session.user._id,
            type: req.query.type || null
        }
        const boards = await boardService.query(filterBy)
        res.send(boards)
    }
    catch (err) {
        res.send(err)
    }
}
async function getBoard(req, res, next) {
    try {
        const { id } = req.params
        const board = await boardService.getById(id)
        res.send(board)
    }
    catch (err) {
        next(err)
    }

}

async function updateBoard(req, res) {
    try {
        const board = req.body
        const updatedBoard = await boardService.update(board)
        return res.send(updatedBoard)
    }
    catch (err) {
        res.status(405).send(err)
    }
}

async function addMemberToBoard(req, res) {
    try {
        const { board, memberId } = req.body
        const updatedBoard = await boardService.addMember(board, memberId)
        return res.send(updatedBoard)
    }
    catch (err) {
        res.status(405).send(err)
    }
}


async function addBoard(req, res) {
    try {
        const boardToAdd = req.body;
        const ownedById = req.session.user._id;
        const savedBoard = await boardService.add(boardToAdd, ownedById)
        res.send(savedBoard)
    }
    catch (err) {
        res.status(405).send(err.message)
    }
}
async function deleteBoard(req, res) {
    try {
        const userId = req.session.user._id;
        const { id } = req.params
        const deletedId = await boardService.remove(id, userId)
        res.send(deletedId)
    }
    catch (err) {
        res.status(405).send(err.message)
    }

}


