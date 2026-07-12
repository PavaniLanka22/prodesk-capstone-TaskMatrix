function ProjectCard({

    id,

    title,

    category,

    progress,

    tasks,

    members,

    onDelete

}) {

    return (

        <div className="project-card">

            <div className="project-top">

                <div className="project-left">

                    <div className="project-icon">

                        📁

                    </div>

                    <div>

                        <h3>{title}</h3>

                        <p>{category} Project</p>

                    </div>

                </div>

                <span className="project-badge">

                    Active

                </span>

            </div>

            <div className="progress-section">

                <div className="progress-header">

                    <span>Progress</span>

                    <span>{progress || 0}%</span>

                </div>

                <div className="progress-bar">

                    <div

                        className="progress-fill"

                        style={{

                            width: `${progress || 0}%`

                        }}

                    ></div>

                </div>

            </div>

            <div className="project-footer">

                <div className="project-info">

                    <span>

                        📝 {tasks} Tasks

                    </span>

                    <span>

                        👥 {members} Members

                    </span>

                </div>

            </div>

            <div className="project-update">

                Updated recently

            </div>

            <div className="project-actions">

                <button className="project-btn">

                    Open Project →

                </button>

                <button

                    className="delete-btn"

                    onClick={onDelete}

                >

                    Delete

                </button>

            </div>

        </div>

    );

}

export default ProjectCard;