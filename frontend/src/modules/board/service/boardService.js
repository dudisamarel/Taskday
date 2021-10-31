import { httpService } from '../../../shared/'

export const boardService = {
    query,
    save,
    getById,
    remove,
    edit,
    addMember
}
async function query(type) {
    try {
        return await httpService.get('board', undefined, { type })
    } catch (err) {
        throw err.message;
    }
}

async function getById(id) {
    try {
        return await httpService.get(`board/${id}`, id)
    } catch (err) {
        throw err.message;
    }
}

async function save(board) {
    try {
        return await httpService.post('board', board)
    }
    catch (err) {
        throw err.message;
    }
}
async function remove(id) {
    //   return httpService.delete(`board/${id}`).then(()=> id)
    try {
        const res =  await httpService.delete(`board/${id}`)
        return res;
    }
    catch (err) {
        throw err.message
    }
}
async function edit(board) {
    try {
        const newBoard = await httpService.put(`board`, board)
        return newBoard;
    }
    catch (err) {
        throw err.message
    }
}
async function addMember(board, memberId) {
    try {
        const newBoard = await httpService.put(`board/member`, { board, memberId })
        return newBoard
    }
    catch (err) {
        throw err.message
    }
}


