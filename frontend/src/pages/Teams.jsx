import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import InviteMemberModal from "../components/InviteMemberModal";
import MemberCard from "../components/MemberCard";
import EditMemberModal from "../components/EditMemberModal";
import DeleteMemberModal from "../components/DeleteMemberModal";

import {
    FiSearch,
    FiUsers
} from "react-icons/fi";

import {
    FaUserFriends,
    FaUserShield
} from "react-icons/fa";

import {
    MdOutlinePersonAddAlt1
} from "react-icons/md";

import "../styles/teams.css";

function Teams() {

    const token = localStorage.getItem("token");

    const [members, setMembers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [roleFilter, setRoleFilter] = useState("All");

    const [showInvite, setShowInvite] = useState(false);

    const [showEdit, setShowEdit] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {

        fetchMembers();

    }, []);

    const fetchMembers = async () => {

        try {

            setLoading(true);

            const response = await axios.get(

                "http://localhost:5000/api/users",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setMembers(response.data.users || []);

        }

        catch {

            setMembers([

                {

                    _id: 1,

                    name: "Pavani Lanka",

                    email: "pavani@email.com",

                    role: "Admin",

                    department: "Engineering",

                    status: "Online"

                },

                {

                    _id: 2,

                    name: "Rahul Sharma",

                    email: "rahul@email.com",

                    role: "Developer",

                    department: "Frontend",

                    status: "Offline"

                },

                {

                    _id: 3,

                    name: "Anjali Patel",

                    email: "anjali@email.com",

                    role: "Tester",

                    department: "QA",

                    status: "Online"

                },

                {

                    _id: 4,

                    name: "John David",

                    email: "john@email.com",

                    role: "Manager",

                    department: "Management",

                    status: "Online"

                }

            ]);

        }

        finally {

            setLoading(false);

        }

    };

    const filteredMembers = useMemo(() => {

        return members.filter(member => {

            const searchMatch =

                member.name.toLowerCase().includes(search.toLowerCase()) ||

                member.email.toLowerCase().includes(search.toLowerCase());

            const roleMatch =

                roleFilter === "All"

                    ? true

                    : member.role === roleFilter;

            return searchMatch && roleMatch;

        });

    }, [members, search, roleFilter]);

    const admins = members.filter(

        member => member.role === "Admin"

    ).length;

    const developers = members.filter(

        member => member.role === "Developer"

    ).length;

    const online = members.filter(

        member => member.status === "Online"

    ).length;

    const openEditModal = (member) => {

        setSelectedMember(member);

        setShowEdit(true);

    };

    const openDeleteModal = (member) => {

        setSelectedMember(member);

        setShowDelete(true);

    };

    const updateMember = (updatedMember) => {

        setMembers(

            members.map(member =>

                member._id === updatedMember._id

                    ? updatedMember

                    : member

            )

        );

        toast.success("Member updated");

    };

    const deleteMember = () => {

        setMembers(

            members.filter(

                member =>

                    member._id !== selectedMember._id

            )

        );

        toast.success("Member removed");

        setShowDelete(false);

        setSelectedMember(null);

    };

    const inviteMember = (member) => {

        setMembers([

            ...members,

            {

                ...member,

                _id: Date.now()

            }

        ]);

        toast.success("Member invited");

    };

    
return (

<div className="dashboard-container">

    <Sidebar />

    <div className="main-content">

        <Navbar />

        <div className="teams-page">

            <div className="page-header">

                <div>

                    <h1>Team Management</h1>

                    <p>
                        Manage your workspace members, roles and collaboration.
                    </p>

                </div>

                <button

                    className="new-member-btn"

                    onClick={() => setShowInvite(true)}

                >

                    + Invite Member

                </button>

            </div>

            <div className="team-stats">

                <div className="team-stat-card">

                    <FiUsers className="team-stat-icon"/>

                    <div>

                        <h4>Total Members</h4>

                        <h2>{members.length}</h2>

                    </div>

                </div>

                <div className="team-stat-card">

                    <FaUserShield className="team-stat-icon purple"/>

                    <div>

                        <h4>Administrators</h4>

                        <h2>{admins}</h2>

                    </div>

                </div>

                <div className="team-stat-card">

                    <FaUserFriends className="team-stat-icon green"/>

                    <div>

                        <h4>Developers</h4>

                        <h2>{developers}</h2>

                    </div>

                </div>

                <div className="team-stat-card">

                    <MdOutlinePersonAddAlt1 className="team-stat-icon orange"/>

                    <div>

                        <h4>Active Today</h4>

                        <h2>{online}</h2>

                    </div>

                </div>

            </div>

            <div className="team-toolbar">

                <div className="search-box">

                    <FiSearch />

                    <input

                        type="text"

                        placeholder="Search by name or email..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                    />

                </div>

                <select

                    className="toolbar-select"

                    value={roleFilter}

                    onChange={(e)=>setRoleFilter(e.target.value)}

                >

                    <option value="All">All Roles</option>

                    <option value="Admin">Admin</option>

                    <option value="Manager">Manager</option>

                    <option value="Developer">Developer</option>

                    <option value="Tester">Tester</option>

                </select>

            </div>

            {

                loading

                ?

                <div className="loading-state">

                    Loading Members...

                </div>

                :

                filteredMembers.length===0

                ?

                <div className="team-empty">

                    <div className="team-empty-icon">

                        👥

                    </div>

                    <h2>No Members Found</h2>

                    <p>

                        Try changing your search or invite a new member.

                    </p>

                </div>

                :

                <div className="member-grid">

                    {

                        filteredMembers.map(member=>(

                            <MemberCard

                                key={member._id}

                                member={member}

                                onEdit={() => openEditModal(member)}

                                onDelete={() => openDeleteModal(member)}

                            />

                        ))

                    }

                </div>

            }

        </div>

    </div>

                        <InviteMemberModal

                open={showInvite}

                onClose={() =>

                    setShowInvite(false)

                }

                onInvite={(member) => {

                    inviteMember(member);

                    setShowInvite(false);

                }}

            />

            <EditMemberModal

                open={showEdit}

                member={selectedMember}

                onClose={() => {

                    setShowEdit(false);

                    setSelectedMember(null);

                }}

                onSave={(updatedMember) => {

                    updateMember(updatedMember);

                    setShowEdit(false);

                    setSelectedMember(null);

                }}

            />

            <DeleteMemberModal

                open={showDelete}

                member={selectedMember}

                onClose={() => {

                    setShowDelete(false);

                    setSelectedMember(null);

                }}

                onDelete={deleteMember}

            />

        </div>

    );

}

export default Teams;