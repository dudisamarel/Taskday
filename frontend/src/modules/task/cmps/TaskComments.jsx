
export const TaskComments = ({ comment, onDeleteComment }) => {
  return (
    <div className="comment flex column  align-center" >
      <h4>{comment.user.fullname}</h4>
      <div className="text ellipsis"
        dangerouslySetInnerHTML={{
          __html: comment.text
        }}>

      </div>
      <button onClick={() => onDeleteComment(comment._id)}>Delete</button>
    </div >
  )
}



