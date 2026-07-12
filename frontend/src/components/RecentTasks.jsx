function RecentTasks() {

    const tasks = [

        {
            title:"Design Login UI",
            priority:"High",
            due:"Today",
            status:"In Progress"
        },

        {
            title:"JWT Authentication",
            priority:"Medium",
            due:"Tomorrow",
            status:"Completed"
        },

        {
            title:"Dashboard Development",
            priority:"High",
            due:"15 Jul",
            status:"Pending"
        },

        {
            title:"README Documentation",
            priority:"Low",
            due:"18 Jul",
            status:"Completed"
        }

    ];

    return (

        <div className="card-section">

            <h3>Recent Tasks</h3>

            {

                tasks.map((task,index)=>(

                    <div
                        key={index}
                        className="task-item"
                    >

                        <div className="task-left">

                            <strong>

                                {task.title}

                            </strong>

                            <div className="task-details">

                                <span className={`priority ${task.priority.toLowerCase()}`}>

                                    {task.priority}

                                </span>

                                <span className="due">

                                    📅 {task.due}

                                </span>

                            </div>

                        </div>

                        <span className={`status ${task.status.toLowerCase().replace(" ","-")}`}>

                            {task.status}

                        </span>

                    </div>

                ))

            }

        </div>

    );

}

export default RecentTasks;