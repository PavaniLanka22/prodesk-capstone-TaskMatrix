function ProjectCard({

    id,

    title,

    category,

    progress,

    tasks,

    members,

    onEdit,

    onDelete

}) {

    const badgeColor =

        progress >= 100

            ? "#10b981"

            : progress >= 60

            ? "#3b82f6"

            : "#f59e0b";

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

                <span

                    className="project-badge"

                    style={{

                        background: badgeColor

                    }}

                >

                    {progress === 100

                        ? "Completed"

                        : "Active"}

                </span>

            </div>

            <div className="progress-section">

                <div className="progress-header">

                    <span>

                        Progress

                    </span>

                    <span>

                        {progress || 0}%

                    </span>

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

                <button

                    className="project-btn"

                >

                    Open →

                </button>

                <button

                    className="edit-btn"

                    onClick={onEdit}

                >

                    ✏ Edit

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