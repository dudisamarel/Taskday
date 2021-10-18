import { utilService } from "./utilService";

const activitesActions = {
    ADD_GROUP: "ADD_GRPOUP",
    REMOVE_GROUP: "REMOVE_GROUP",
    ADD_TASK: "ADD_TASk",
    REMOVE_TASK: "REMOVE_TASK",
}

function addActivity(action, currBoard, user) {
    if (action) {
        const id = utilService.makeId()
        if (!currBoard.activities) currBoard.activities = []
        switch (action.type) {
            case activitesActions.REMOVE_TASK:
                currBoard.activities.unshift({ id, text: `${user.username} has removed the task - ${action.task.title}` })
                break;
            case activitesActions.ADD_TASK:
                currBoard.activities.unshift({ id, text: `${user.username} has added the task - ${action.task.title}` })
                break;
            case activitesActions.REMOVE_GROUP:
                currBoard.activities.unshift({ id, text: `${user.username} has removed the group - ${action.group.title}` })
                break;
            case activitesActions.ADD_GROUP:
                currBoard.activities.unshift({ id, text: `${user.username} has added new group` })
                break;
            default:
                break;
        }
    }
}

export {
    addActivity,
    activitesActions
}