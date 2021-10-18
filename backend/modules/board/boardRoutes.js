const express = require('express')
const { getBoard, getBoards, deleteBoard, updateBoard, addBoard, addMemberToBoard } = require('./boardController')
const router = express.Router()

router.get('/', getBoards)
router.post('/', addBoard)
router.get('/:id', getBoard)
router.put('/', updateBoard)
router.put('/member', addMemberToBoard)
router.delete('/:id', deleteBoard)


module.exports = router