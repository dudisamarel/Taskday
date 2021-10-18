export const Activities = ({ activities }) => {

    return (<div className="activities-container flex column" >
        {(activities && activities.length > 0) ? activities.map(activity => <div key={activity.id}>
            <span >{activity.text}</span>
            <hr />
        </div >) : <span>No activities yet...</span>}
    </div>)
}