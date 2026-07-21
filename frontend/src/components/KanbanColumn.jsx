import { FiPlus } from "react-icons/fi";
import KanbanCard from "./KanbanCard";

function KanbanColumn({

title,

color,

tasks,

onEdit,

onRefresh,

onAdd

}) {

    return (

        <div className={`kanban-column ${color}`}>

            <div className="kanban-column-header">

<div className="column-title">

    <div className={`column-dot ${color}`}></div>

    <h3>{title}</h3>

</div>

                <button
    className="column-add-btn"
    onClick={onAdd}
>
    <FiPlus />
    <span>Add</span>
</button>

            </div>

            <div className="kanban-column-body">

                {
                    tasks.length === 0 ?

                        <div className="kanban-empty">

                            <div className="kanban-empty-icon">
                                📂
                            </div>

                            <h4>No Tasks Yet</h4>

                            <p>
                                Drag tasks here or create a new task.
                            </p>

                        </div>

                        :

                        tasks.map(task => (

                            <KanbanCard
                                key={task._id}
                                task={task}
                                onEdit={() => onEdit(task)}
                                onDeleted={onRefresh}
                            />

                        ))
                }

            </div>

        </div>

    );

}

export default KanbanColumn;