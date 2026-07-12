function UpcomingDeadlines() {

    const deadlines = [

        {
            title: "Sprint 14 Submission",
            date: "Tomorrow",
            priority: "High"
        },

        {
            title: "ER Diagram Review",
            date: "15 Jul",
            priority: "Medium"
        },

        {
            title: "Dashboard Review",
            date: "18 Jul",
            priority: "Medium"
        },

        {
            title: "Project Planning",
            date: "22 Jul",
            priority: "Low"
        }

    ];

    return (

        <div className="card-section">

            <h3>Upcoming Deadlines</h3>

            {

                deadlines.map((item,index)=>(

                    <div
                        key={index}
                        className="deadline-item"
                    >

                        <div>

                            <strong>{item.title}</strong>

                            <div className="deadline-date">

                                📅 {item.date}

                            </div>

                        </div>

                        <span className={`deadline-priority ${item.priority.toLowerCase()}`}>

                            {item.priority}

                        </span>

                    </div>

                ))

            }

        </div>

    );

}

export default UpcomingDeadlines;