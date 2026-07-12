function DeleteProjectModal({
    open,
    onClose,
    onConfirm,
    projectName
}) {

    if (!open) return null;

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
                    🗑
                </div>

                <h2>Delete Project?</h2>

                <p>

                    Are you sure you want to delete

                    <strong> "{projectName}" </strong>

                    ?

                </p>

                <p className="delete-warning">
    This action cannot be undone.
</p>

                <div className="delete-actions">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >

                        Cancel

                    </button>

                    <button
                        className="delete-btn"
                        onClick={onConfirm}
                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteProjectModal;