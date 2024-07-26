import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdOutlineAssignment } from "react-icons/md";
import { FaListAlt, FaVideo, FaSnapchatGhost, FaMoneyBillWave } from 'react-icons/fa';
import { LuLogOut } from "react-icons/lu";
import { FaNoteSticky } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaUsers } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutTeacherMutation } from "../Slices/userApiSlice";
import { logout } from "../Slices/authSlice";

const TeacherSidebar = () => {
  const [open, setOpen] = useState(true);
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [videosOpen, setVideosOpen] = useState(false);
  const [examOpen, setExamOpen] = useState(false); // State for Exam submenu
  const [markListOpen, setMarkListOpen] = useState(false); // State for Mark List submenu
  const [chatOpen, setChatOpen] = useState(false); // State for Chat submenu

  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutTeacherMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!userInfo) {
    return <navigate to="/teacher-login" />;
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
    { name: "Dashboard", link: "/Teacher", icon: MdOutlineDashboard },
    { name: "Profile", link: "/Teacher/profile", icon: AiOutlineUser },
    { 
      name: "Attendance", 
      link: "#", 
      icon: MdOutlineAssignment,
      submenu: [
        { name: "Self Attendance", link: "/Teacher/teacher-Attendance", icon: MdOutlineAssignment },
        { name: "View Attendance", link: "/Teacher/view-attendance", icon: MdOutlineAssignment },
        { name: "Student Attendance", link: "/Teacher/student-attendance", icon: MdOutlineAssignment }
      ]
    },
    { 
      name: "Notes", 
      link: "#", 
      icon: FaNoteSticky,
      submenu: [
        { name: "Adding Notes", link: "/Teacher/note-adding", icon: FaNoteSticky },
        { name: "Added Notes", link: "/Teacher/note-added", icon: FaNoteSticky }
      ]
    },
    { 
      name: "Videos", 
      link: "#", 
      icon: FaVideo,
      submenu: [
        { name: "Adding Video", link: "/Teacher/video-adding", icon: FaVideo },
        { name: "Added Videos", link: "/Teacher/videos-added", icon: FaVideo }
      ]
    },
    { 
      name: "Exam", 
      link: "#", 
      icon: FiEdit, 
      margin: true,
      submenu: [
        { name: "Question Uploading", link: "/Teacher/question-uploading", icon: FiEdit },
        { name: "Added Question", link: "/Teacher/questions-added", icon: FiEdit },
        { name: "Student Answer Sheet", link: "/Teacher/answer-table", icon: FiEdit }
      ]
    },
    {
      name: "Mark List",
      link: "#",
      icon: FaListAlt,
      margin: true,
      submenu: [
        { name: "Mark Adding", link: "/Teacher/mark-adding", icon: FaListAlt },
        { name: "Added Marks", link: "/Teacher/added-marks", icon: FaListAlt },
      ],
    },
    {
      name: "Chat",
      link: "#",
      icon: FaSnapchatGhost,
      submenu: [
        { name: "Student Chat", link: "/Teacher/Chats", icon: FaSnapchatGhost },
        { name: "Parent Chat", link: "/Teacher/Chats-parent", icon: FaSnapchatGhost }
      ],
    },
    { name: "Student List", link: "/Teacher/student-list", icon: FaListAlt },
    { name: "Parents Meeting", link: "/Teacher/lobby-screen", icon: FaUsers , margin: true },
    { name: "Online Class", link: "/Teacher/online-class", icon: FaVideo },
    { name: "Salary", link: "/Teacher/teacher-salarytab", icon: FaMoneyBillWave },
    { name: "Logout", icon: LuLogOut, onClick: () => handleLogout() },
  ];

  const toggleAttendanceMenu = () => {
    setAttendanceOpen(!attendanceOpen);
  };

  const toggleNotesMenu = () => {
    setNotesOpen(!notesOpen);
  };

  const toggleVideosMenu = () => {
    setVideosOpen(!videosOpen);
  };

  const toggleExamMenu = () => {
    setExamOpen(!examOpen);
  };

  const toggleMarkListMenu = () => {
    setMarkListOpen(!markListOpen);
  };

  const toggleChatMenu = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
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
            <div key={i}>
              {!menu.submenu ? (
                <Link
                  to={menu?.link}
                  className={` ${
                    menu?.margin && "mt-5"
                  } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                  onClick={menu?.onClick}
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    {menu?.name}
                  </h2>
                </Link>
              ) : (
                <div>
                  <div
                    className={` ${
                      menu?.margin && "mt-5"
                    } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer`}
                    onClick={
                      menu.name === "Attendance" ? toggleAttendanceMenu
                      : menu.name === "Notes" ? toggleNotesMenu 
                      : menu.name === "Videos" ? toggleVideosMenu 
                      : menu.name === "Exam" ? toggleExamMenu 
                      : menu.name === "Mark List" ? toggleMarkListMenu
                      : toggleChatMenu
                    }
                  >
                    <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      {menu?.name}
                    </h2>
                    {open && (
                      <div className="ml-auto">
                        {menu.name === "Attendance" && attendanceOpen ? (
                          <IoIosArrowUp size={20} />
                        ) : menu.name === "Attendance" && !attendanceOpen ? (
                          <IoIosArrowDown size={20} />
                        ) : menu.name === "Notes" && notesOpen ? (
                          <IoIosArrowUp size={20} />
                        ) : menu.name === "Notes" && !notesOpen ? (
                          <IoIosArrowDown size={20} />
                        ) : menu.name === "Videos" && videosOpen ? (
                          <IoIosArrowUp size={20} />
                        ) : menu.name === "Videos" && !videosOpen ? (
                          <IoIosArrowDown size={20} />
                        ) : menu.name === "Exam" && examOpen ? (
                          <IoIosArrowUp size={20} />
                        ) : menu.name === "Exam" && !examOpen ? (
                          <IoIosArrowDown size={20} />
                        ) : menu.name === "Mark List" && markListOpen ? (
                          <IoIosArrowUp size={20} />
                        ) : menu.name === "Mark List" && !markListOpen ? (
                          <IoIosArrowDown size={20} />
                        ) : menu.name === "Chat" && chatOpen ? (
                          <IoIosArrowUp size={20} />
                        ) : (
                          <IoIosArrowDown size={20} />
                        )}
                      </div>
                    )}
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      {menu?.name}
                    </h2>
                  </div>
                  {(menu.name === "Attendance" && attendanceOpen) ||
                  (menu.name === "Notes" && notesOpen) ||
                  (menu.name === "Videos" && videosOpen) ||
                  (menu.name === "Exam" && examOpen) ||
                  (menu.name === "Mark List" && markListOpen) ||
                  (menu.name === "Chat" && chatOpen) ? (
                    <div className="ml-6">
                      {menu?.submenu.map((submenuItem, j) => (
                        <Link
                          key={j}
                          to={submenuItem?.link}
                          className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                        >
                          <div>
                            {React.createElement(submenuItem?.icon, {
                              size: "20",
                            })}
                          </div>
                          <h2
                            style={{
                              transitionDelay: `${i + 3}00ms`,
                            }}
                            className={`whitespace-pre duration-500 ${
                              !open && "opacity-0 translate-x-28 overflow-hidden"
                            }`}
                          >
                            {submenuItem?.name}
                          </h2>
                          <h2
                            className={`${
                              open && "hidden"
                            } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                          >
                            {submenuItem?.name}
                          </h2>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeacherSidebar;
