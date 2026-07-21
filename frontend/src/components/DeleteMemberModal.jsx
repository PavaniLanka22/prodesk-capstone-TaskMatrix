import {
    FiAlertTriangle
} from "react-icons/fi";

function DeleteMemberModal({

    open,

    member,

    onClose,

    onDelete

}) {

    if (!open || !member) return null;

    return (

        <div

            className="modal-overlay"

            onClick={onClose}

        >

            <div

                className="delete-modal"

                onClick={(e) => e.stopPropagation()}

            >

                <div className="delete-icon">

                    <FiAlertTriangle size={36} />

                </div>

                <h2>

                    Remove Team Member

                </h2>

                <p>

                    Are you sure you want to remove this member from your workspace?

                </p>

                <h3>

                    {member.name}

                </h3>

                <span>

                    {member.email}

                </span>

                <div className="delete-buttons">

                    <button

                        className="cancel-btn"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    <button

                        className="delete-btn"

                        onClick={onDelete}

                    >

                        Remove Member

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteMemberModal;