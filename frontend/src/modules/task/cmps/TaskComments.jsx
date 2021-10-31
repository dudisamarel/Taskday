
export const TaskComments = ({ task, onDeleteComment }) => {
  return (
    <div className="comment flex column  align-center" key={task._id}>
      <h4>{task.user.fullname}</h4>
      <div className="text ellipsis">
        <span
          dangerouslySetInnerHTML={{
            __html: task.text
          }}>
        </span>
      </div>
      <button onClick={() => onDeleteComment(task._id)}>Delete</button>
    </div >
  )
}



