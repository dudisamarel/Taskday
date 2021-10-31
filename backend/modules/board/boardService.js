
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    update,
    add,
    remove,
    addMember
}

async function query(filterBy) {
    try {
        //QUERY
        const collection = await dbService.getCollection('board')
        // with filter
        const criteria = _buildCriteria(filterBy)
        var boards = await collection.find(criteria).toArray()
        return boards
    }
    catch (err) {
        throw err
    }
}
async function getById(id) {
    try {
        const collection = await dbService.getCollection('board')
        const toy = await collection.findOne({ '_id': ObjectId(id) })

        return toy

    }
    catch {
        const err = new Error('No Board with this id exist')
        err.status = 404
        throw err
    }
}
async function remove(id, userId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = await collection.findOne({ '_id': ObjectId(id) })
        if (ObjectId(userId).equals(board.ownedBy)) {
            await collection.deleteOne({ '_id': ObjectId(id) })
            return board._id
        }
        else throw Error('Denied! Your\'e not the owner of the board')
    }
    catch (err) {
        throw err
    }
}

async function update(board) {
    try {
        const updatedBoard = { ...board };
        delete updatedBoard._id
        delete updatedBoard.ownedBy
        updatedBoard.ownedBy = ObjectId(board.ownedBy)
        updatedBoard.members = updatedBoard.members.map((id) => ObjectId(id))
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ '_id': ObjectId(board._id) }, { $set: updatedBoard })
        return board
    } catch (err) {
        throw err
    }
}
async function addMember(board, memberId) {
    board.members.push(memberId)
    const newBoard = await update(board)
    return newBoard
}

async function add(board, ownedById) {
    try {
        board.ownedBy = ObjectId(ownedById)
        const collection = await dbService.getCollection('board')
        await collection.insertOne(board)
        return board
    } catch (err) {
        throw err
    }
}

//build the filter by
function _buildCriteria(filterBy) {
    var criteria = {
        '$or': [
            { members: { $in: [ObjectId(filterBy._id)] } }
            , { ownedBy: { $eq: ObjectId(filterBy._id) } }
        ]
    }
    if (filterBy.type && filterBy.type.length > 0) {
        criteria.type = { $in: filterBy.type }
    }
    return criteria
}



