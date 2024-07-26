import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdOutlineAssignment } from "react-icons/md";
import { FaListAlt, FaVideo, FaSnapchatGhost, FaCreditCard, FaIdCard } from 'react-icons/fa';
import { LuLogOut } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutParentMutation } from "../Slices/userApiSlice";
import { logout } from "../Slices/authSlice";

const ParentSidebar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutParentMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!userInfo) {
    return <Navigate to="/parent-login" />;
  }

  const userName = userInfo?.name || 'User';

  const handleLogout = async () => {
    console.log('handleLogout function is called');
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/'); // Redirect using useNavigate
    } catch (err) {
      console.log(err);
    }
  };

  const menus = [
    { name: "Dashboard", link: "/Parent", icon: MdOutlineDashboard },
    { name: "Profile", link: "/Parent/profile", icon: AiOutlineUser },
    { name: "Attendance", link: "/Parent/child-attendance", icon: MdOutlineAssignment },
    { name: "Marklist", link: "/Parent/child-marks", icon: FaListAlt, margin: true },
    { name: "Fees Payment", link: "/Parent/fees-table", icon: FaCreditCard },
    { name: "Paid Fees Details", link: "/Parent/paided-details", icon: FaCreditCard },
    { name: "Online Meeting", link: "/Parent/lobby-screen", icon: FaVideo },
    { name: "Student ID", link: "/Parent/child-details", icon: FaIdCard, margin: true },
    { name: "Chat", link: "/Parent/child-chats", icon: FaSnapchatGhost },
    { name: "Logout", icon: LuLogOut, onClick: () => handleLogout() },
  ];

  const [open, setOpen] = useState(true);

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex items-center justify-between">
          <span className={`text-lg font-semibold ${!open && 'hidden'}`}>{userName}</span>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              onClick={menu?.onClick}
              className={` ${menu?.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ParentSidebar;
