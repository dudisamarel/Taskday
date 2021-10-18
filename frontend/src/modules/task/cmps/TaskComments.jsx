import { Avatar } from "@material-ui/core"

export const TaskComments = ({task , onDeleteComment}) => {
    return (
        <div className="task-comments-wrapper flex column justify-content-center" key={task._id}>
            <div className="upper-card-container flex">
            <Avatar alt="Remy Sharp" src="" />
                <h4>username</h4>
            </div>
            <div
            className="html-content-wrapper"
              dangerouslySetInnerHTML={{
                __html: task.text
              }}></div>
            <button onClick={() => onDeleteComment(task._id)}>Delete</button>
          </div>
    )
}



// <div className="task-comments-wrapper flex justify-space-around" key={task._id}>
//             <div
//             className="html-content-wrapper"
//               dangerouslySetInnerHTML={{
//                 __html: task.text
//               }}></div>
//             <button onClick={() => onDeleteComment(task._id)}>Delete</button>
//           </div>