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
    FiUsers,
} from "react-icons/fi";

import {
    FaUserFriends,
    FaUserShield,
} from "react-icons/fa";

import {
    MdOutlinePersonAddAlt1,
} from "react-icons/md";

import "../styles/teams.css";


function Teams() {

    // ==================================================
    // API URL
    // ==================================================

    const API_URL =
        import.meta.env.VITE_API_URL;


    const token =
        localStorage.getItem("token");


    // ==================================================
    // STATE
    // ==================================================

    const [members, setMembers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [roleFilter, setRoleFilter] =
        useState("All");

    const [showInvite, setShowInvite] =
        useState(false);

    const [showEdit, setShowEdit] =
        useState(false);

    const [showDelete, setShowDelete] =
        useState(false);

    const [selectedMember, setSelectedMember] =
        useState(null);


    // ==================================================
    // FETCH MEMBERS
    // ==================================================

    const fetchMembers = async () => {

        try {

            setLoading(true);


            const response =
                await axios.get(

                    `${API_URL}/api/users`,

                    {

                        headers: {

                            Authorization:
                                `Bearer ${token}`,

                        },

                    }

                );


            setMembers(

                response.data.users || []

            );

        }

        catch (error) {

            console.error(

                "Failed to fetch members:",

                error

            );


            toast.error(

                error.response?.data?.message ||

                "Failed to load team members."

            );

        }

        finally {

            setLoading(false);

        }

    };


    // ==================================================
    // LOAD MEMBERS ON PAGE LOAD
    // ==================================================

    useEffect(() => {

        fetchMembers();

    }, []);


    // ==================================================
    // FILTER MEMBERS
    // ==================================================

    const filteredMembers = useMemo(() => {

        return members.filter(member => {

            const memberName =
                member.name || "";

            const memberEmail =
                member.email || "";


            const searchValue =
                search.toLowerCase();


            const searchMatch =

                memberName
                    .toLowerCase()
                    .includes(searchValue)

                ||

                memberEmail
                    .toLowerCase()
                    .includes(searchValue);


            const roleMatch =

                roleFilter === "All"

                    ? true

                    : member.role === roleFilter;


            return (

                searchMatch &&

                roleMatch

            );

        });

    }, [

        members,

        search,

        roleFilter,

    ]);


    // ==================================================
    // STATISTICS
    // ==================================================

    const admins =

        members.filter(

            member =>

                member.role === "Admin"

        ).length;


    const developers =

        members.filter(

            member =>

                member.role === "Developer"

        ).length;


    const online =

        members.filter(

            member =>

                member.status === "Online"

        ).length;


    // ==================================================
    // OPEN EDIT
    // ==================================================

    const openEditModal = (member) => {

        setSelectedMember(member);

        setShowEdit(true);

    };


    // ==================================================
    // OPEN DELETE
    // ==================================================

    const openDeleteModal = (member) => {

        setSelectedMember(member);

        setShowDelete(true);

    };


    // ==================================================
    // UPDATE MEMBER
    // THIS NOW SAVES TO MONGODB
    // ==================================================

    const updateMember = async (updatedMember) => {

        try {

            const response =

                await axios.put(

                    `${API_URL}/api/users/${updatedMember._id}`,

                    {

                        name:
                            updatedMember.name,

                        email:
                            updatedMember.email,

                        role:
                            updatedMember.role,

                        department:
                            updatedMember.department,

                        status:
                            updatedMember.status,

                    },

                    {

                        headers: {

                            Authorization:
                                `Bearer ${token}`,

                        },

                    }

                );


            const savedMember =
                response.data.user;


            // ------------------------------------------
            // UPDATE REACT STATE WITH DATABASE RESPONSE
            // ------------------------------------------

            setMembers(

                previousMembers =>

                    previousMembers.map(

                        member =>

                            member._id ===
                            savedMember._id

                                ? savedMember

                                : member

                    )

            );


            toast.success(

                "Member updated successfully."

            );


            // ------------------------------------------
            // CLOSE MODAL
            // ------------------------------------------

            setShowEdit(false);

            setSelectedMember(null);


        }

        catch (error) {

            console.error(

                "Failed to update member:",

                error

            );


            toast.error(

                error.response?.data?.message ||

                "Failed to update member."

            );

        }

    };


    // ==================================================
    // DELETE MEMBER
    // ==================================================

    const deleteMember = async () => {

        if (!selectedMember) {

            return;

        }


        try {

            await axios.delete(

                `${API_URL}/api/users/${selectedMember._id}`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${token}`,

                    },

                }

            );


            setMembers(

                previousMembers =>

                    previousMembers.filter(

                        member =>

                            member._id !==
                            selectedMember._id

                    )

            );


            toast.success(

                "Member removed successfully."

            );


            setShowDelete(false);

            setSelectedMember(null);


        }

        catch (error) {

            console.error(

                "Failed to delete member:",

                error

            );


            toast.error(

                error.response?.data?.message ||

                "Failed to delete member."

            );

        }

    };


    // ==================================================
    // INVITE MEMBER
    // ==================================================

    const inviteMember = (member) => {

        setMembers(

            previousMembers => [

                ...previousMembers,

                {

                    ...member,

                    _id: Date.now(),

                },

            ]

        );


        toast.success(

            "Member invited successfully."

        );

    };


    // ==================================================
    // RENDER
    // ==================================================

    return (

        <div className="dashboard-container">

            <Sidebar />


            <div className="main-content">

                <Navbar />


                <div className="teams-page">


                    {/* HEADER */}

                    <div className="page-header">

                        <div>

                            <h1>

                                Team Management

                            </h1>


                            <p>

                                Manage your workspace members, roles and collaboration.

                            </p>

                        </div>


                        <button

                            className="new-member-btn"

                            onClick={() =>
                                setShowInvite(true)
                            }

                        >

                            + Invite Member

                        </button>

                    </div>


                    {/* STATISTICS */}

                    <div className="team-stats">


                        <div className="team-stat-card">

                            <FiUsers className="team-stat-icon" />

                            <div>

                                <h4>

                                    Total Members

                                </h4>


                                <h2>

                                    {members.length}

                                </h2>

                            </div>

                        </div>


                        <div className="team-stat-card">

                            <FaUserShield className="team-stat-icon purple" />

                            <div>

                                <h4>

                                    Administrators

                                </h4>


                                <h2>

                                    {admins}

                                </h2>

                            </div>

                        </div>


                        <div className="team-stat-card">

                            <FaUserFriends className="team-stat-icon green" />

                            <div>

                                <h4>

                                    Developers

                                </h4>


                                <h2>

                                    {developers}

                                </h2>

                            </div>

                        </div>


                        <div className="team-stat-card">

                            <MdOutlinePersonAddAlt1 className="team-stat-icon orange" />

                            <div>

                                <h4>

                                    Active Today

                                </h4>


                                <h2>

                                    {online}

                                </h2>

                            </div>

                        </div>


                    </div>


                    {/* TOOLBAR */}

                    <div className="team-toolbar">


                        <div className="search-box">

                            <FiSearch />


                            <input

                                type="text"

                                placeholder="Search by name or email..."

                                value={search}

                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }

                            />

                        </div>


                        <select

                            className="toolbar-select"

                            value={roleFilter}

                            onChange={(e) =>
                                setRoleFilter(
                                    e.target.value
                                )
                            }

                        >

                            <option value="All">

                                All Roles

                            </option>

                            <option value="Admin">

                                Admin

                            </option>

                            <option value="Manager">

                                Manager

                            </option>

                            <option value="Developer">

                                Developer

                            </option>

                            <option value="Tester">

                                Tester

                            </option>

                            <option value="Viewer">

                                Viewer

                            </option>

                        </select>

                    </div>


                    {/* MEMBERS */}

                    {

                        loading

                            ?

                            (

                                <div className="loading-state">

                                    Loading Members...

                                </div>

                            )

                            :

                            filteredMembers.length === 0

                                ?

                                (

                                    <div className="team-empty">

                                        <div className="team-empty-icon">

                                            👥

                                        </div>


                                        <h2>

                                            No Members Found

                                        </h2>


                                        <p>

                                            Try changing your search or invite a new member.

                                        </p>

                                    </div>

                                )

                                :

                                (

                                    <div className="member-grid">

                                        {

                                            filteredMembers.map(

                                                member => (

                                                    <MemberCard

                                                        key={
                                                            member._id
                                                        }

                                                        member={
                                                            member
                                                        }

                                                        onEdit={() =>
                                                            openEditModal(
                                                                member
                                                            )
                                                        }

                                                        onDelete={() =>
                                                            openDeleteModal(
                                                                member
                                                            )
                                                        }

                                                    />

                                                )

                                            )

                                        }

                                    </div>

                                )

                    }

                </div>

            </div>


            {/* INVITE */}

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


            {/* EDIT */}

            <EditMemberModal

                open={showEdit}

                member={selectedMember}

                onClose={() => {

                    setShowEdit(false);

                    setSelectedMember(null);

                }}

                onSave={updateMember}

            />


            {/* DELETE */}

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