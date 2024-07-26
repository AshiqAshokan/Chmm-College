import React, { useState } from "react";
import { HiMenuAlt3, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { MdOutlineDashboard, MdOutlineAssignment } from "react-icons/md";
import { FaListAlt, FaVideo, FaSnapchatGhost } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { FaNoteSticky } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutStudentMutation } from "../Slices/userApiSlice";
import { logout } from "../Slices/authSlice";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutStudentMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!userInfo) {
    return <Navigate to="/student-login" />;
  }

  const userName = userInfo?.name || "User";

  const handleLogout = async () => {
    console.log("handleLogout function is called");
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/"); // Redirect using useNavigate
    } catch (err) {
      console.log(err);
    }
  };

  const menus = [
    { name: "Dashboard", link: "/Student", icon: MdOutlineDashboard },
    { name: "Profile", link: "/Student/profile", icon: AiOutlineUser },
    {
      name: "Attendance",
      icon: MdOutlineAssignment,
      subMenus: [
        { name: "Attendance", link: "/Student/Attendance" },
        { name: "View Attendance", link: "/Student/ViewAttendance" },
      ],
    },
    { name: "Marklist", link: "/Student/student-marks", icon: FaListAlt, margin: true },
    { name: "Notes", link: "/Student/Added-Notes", icon: FaNoteSticky },
    { name: "Videos", link: "/Student/student-video", icon: FaVideo },
    {
      name: "Exam",
      icon: FiEdit,
      margin: true,
      subMenus: [
        { name: "Question Paper", link: "/Student/Question-Papers" },
        // { name: "Submitted Answer", link: "/Student/submit-answer" },
      ],
    },
    { name: "Chat", link: "/Student/student-chats", icon: FaSnapchatGhost },
    { name: "Online Class", link: "/Student/online-class", icon: FaVideo },
    { name: "Logout", icon: LuLogOut, onClick: handleLogout },
  ];

  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState({});

  const handleSubMenuClick = (menuName) => {
    setSubMenuOpen((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex items-center justify-between">
          <span className={`text-lg font-semibold ${!open && "hidden"}`}>
            {userName}
          </span>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, i) => (
            <div key={i} className="flex flex-col">
              {/* Profile and Dashboard menu items */}
              {menu.name === "Profile" || menu.name === "Dashboard" ? (
                <Link
                  to={menu.link}
                  className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
                >
                  <div>
                    <menu.icon size="20" />
                  </div>
                  <h2
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu.name}
                  </h2>
                </Link>
              ) : (
                <div
                  className={`${
                    menu.margin && "mt-5"
                  } group flex items-center justify-between text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                  onClick={() => menu.subMenus && handleSubMenuClick(menu.name)}
                >
                  <div className="flex items-center gap-2">
                    <Link
                      to={menu.link || "#"}
                      className="flex items-center gap-2"
                      onClick={menu.onClick}
                    >
                      <div>{React.createElement(menu.icon, { size: "20" })}</div>
                      <h2
                        className={`whitespace-pre duration-500 ${
                          !open && "opacity-0 translate-x-28 overflow-hidden"
                        }`}
                      >
                        {menu.name}
                      </h2>
                    </Link>
                  </div>
                  {/* Conditional rendering of arrow icons */}
                  {menu.subMenus && (
                    <div className={`flex items-center ${!open ? 'hidden' : ''}`}>
                      {subMenuOpen[menu.name] ? (
                        <HiChevronUp size={20} />
                      ) : (
                        <HiChevronDown size={20} />
                      )}
                    </div>
                  )}
                </div>
              )}
              {menu.subMenus && subMenuOpen[menu.name] && (
                <div className="flex flex-col ml-4">
                  {menu.subMenus.map((subMenu, j) => (
                    <Link
                      to={subMenu.link}
                      key={j}
                      className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
                    >
                      <h2
                        style={{
                          transitionDelay: `${i + 3}00ms`,
                        }}
                        className={`whitespace-pre duration-500 ${
                          !open && "opacity-0 translate-x-28 overflow-hidden"
                        }`}
                      >
                        {subMenu.name}
                      </h2>
                      <h2
                        className={`${
                          open && "hidden"
                        } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                      >
                        {subMenu.name}
                      </h2>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
