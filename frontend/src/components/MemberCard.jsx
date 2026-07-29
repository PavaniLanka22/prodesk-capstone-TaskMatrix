import {
    FiEdit2,
    FiMail,
    FiTrash2
} from "react-icons/fi";

import {
    FaUserCircle
} from "react-icons/fa";

function MemberCard({

    member,

    onEdit,

    onDelete

}) {

    const initials =

        member.name
            ?.split(" ")
            .map(word => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();


    const normalizedStatus =

        String(member.status || "Offline")
            .trim()
            .toLowerCase();


    const isOnline =
        normalizedStatus === "online";


    const displayStatus =
        isOnline
            ? "Online"
            : "Offline";


    const roleClass = () => {

        switch (member.role) {

            case "Admin":
                return "role admin";

            case "Manager":
                return "role manager";

            case "Developer":
                return "role developer";

            case "Tester":
                return "role tester";

            default:
                return "role viewer";

        }

    };


    return (

        <div className="member-card">

            {/* ================= MEMBER ================= */}

            <div className="member-left">

                <div className="member-avatar">

                    {initials || "U"}

                </div>

                <div className="member-info">

                    <h3 className="member-name">

                        {member.name || "Unknown Member"}

                    </h3>

                    <p className="member-department">

                        {member.department || "No Department"}

                    </p>

                </div>

            </div>


            {/* ================= EMAIL ================= */}

            <div className="member-email">

                <FiMail />

                <span>

                    {member.email || "No Email"}

                </span>

            </div>


            {/* ================= ROLE ================= */}

            <div className="member-role-column">

                <span className={roleClass()}>

                    {member.role || "Viewer"}

                </span>

            </div>


            {/* ================= STATUS ================= */}

            <div className="member-status-column">

                <span

                    className={

                        isOnline

                            ? "member-status online"

                            : "member-status offline"

                    }

                >

                    <span className="status-dot"></span>

                    {displayStatus}

                </span>

            </div>


            {/* ================= WORKSPACE ================= */}

            <div className="member-access">

                <FaUserCircle />

                <span>

                    Workspace Member

                </span>

            </div>


            {/* ================= ACTIONS ================= */}

            <div className="member-actions">

                <button

                    type="button"

                    className="member-icon-btn"

                    onClick={onEdit}

                    title="Edit Member"

                >

                    <FiEdit2 />

                </button>

                <button

                    type="button"

                    className="member-icon-btn delete"

                    onClick={onDelete}

                    title="Delete Member"

                >

                    <FiTrash2 />

                </button>

            </div>

        </div>

    );

}

export default MemberCard;