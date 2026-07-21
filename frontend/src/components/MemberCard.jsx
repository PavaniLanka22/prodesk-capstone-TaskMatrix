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

    const initials = member.name
        ?.split(" ")
        .map(word => word[0])
        .join("")
        .substring(0,2)
        .toUpperCase();

    const roleClass = () => {

        switch(member.role){

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

            <div className="member-top">

                <div className="member-avatar">

                    {initials}

                </div>

                <div className="member-actions">

                    <button

                        className="member-icon-btn"

                        onClick={onEdit}

                        title="Edit Member"

                    >

                        <FiEdit2/>

                    </button>

                    <button

                        className="member-icon-btn delete"

                        onClick={onDelete}

                        title="Delete Member"

                    >

                        <FiTrash2/>

                    </button>

                </div>

            </div>

            <div className="member-details">

                <h3>

                    {member.name}

                </h3>

                <p className="member-department">

                    {member.department}

                </p>

            </div>

            <div className="member-email">

                <FiMail/>

                <span>

                    {member.email}

                </span>

            </div>

            <div className="member-badges">

                <span className={roleClass()}>

                    {member.role}

                </span>

                <span

                    className={

                        member.status==="Online"

                        ?

                        "member-status online"

                        :

                        "member-status offline"

                    }

                >

                    <span className="status-dot"></span>

                    {member.status}

                </span>

            </div>

            <div className="member-divider"></div>

            <div className="member-footer">

                <div className="member-profile">

                    <FaUserCircle/>

                    <span>

                        Workspace Member

                    </span>

                </div>

            </div>

        </div>

    );

}

export default MemberCard;