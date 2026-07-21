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

            .map(word =>
                word[0]
            )

            .join("")

            .substring(0, 2)

            .toUpperCase();


    /*
    ==========================================================
    NORMALIZE STATUS

    This ensures:

    Online
    online
    ONLINE
    " Online "

    all become Online.

    Everything else becomes Offline.
    ==========================================================
    */

    const normalizedStatus =

        String(
            member.status || "Offline"
        )

            .trim()

            .toLowerCase();


    const isOnline =
        normalizedStatus === "online";


    const displayStatus =
        isOnline
            ? "Online"
            : "Offline";


    /*
    ==========================================================
    ROLE CLASS
    ==========================================================
    */

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


            {/* TOP */}

            <div className="member-top">


                <div className="member-avatar">

                    {initials || "U"}

                </div>


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


            {/* DETAILS */}

            <div className="member-details">


                <h3>

                    {member.name || "Unknown Member"}

                </h3>


                <p className="member-department">

                    {member.department ||
                        "No department"}

                </p>


            </div>


            {/* EMAIL */}

            <div className="member-email">


                <FiMail />


                <span>

                    {member.email ||
                        "No email"}

                </span>


            </div>


            {/* BADGES */}

            <div className="member-badges">


                {/* ROLE */}

                <span className={roleClass()}>

                    {member.role ||
                        "Viewer"}

                </span>


                {/* STATUS */}

                <span

                    className={

                        isOnline

                            ? "member-status online"

                            : "member-status offline"

                    }

                >


                    <span className="status-dot"></span>


                    <span>

                        {displayStatus}

                    </span>


                </span>


            </div>


            {/* DIVIDER */}

            <div className="member-divider"></div>


            {/* FOOTER */}

            <div className="member-footer">


                <div className="member-profile">


                    <FaUserCircle />


                    <span>

                        Workspace Member

                    </span>


                </div>


            </div>


        </div>

    );

}

export default MemberCard;