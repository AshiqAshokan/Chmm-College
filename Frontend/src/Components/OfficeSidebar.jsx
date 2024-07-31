import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdOutlineAssignment } from "react-icons/md";
import { FaListAlt, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { LuLogOut } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useLogoutMutation } from "../Slices/userApiSlice";
import { logout } from "../Slices/authSlice";

const OfficeSidebar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!userInfo) {
    return <Navigate to="/office-login" />;
  }

  const handleLogout = async () => {
    console.log('handleLogout function is called');
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const [open, setOpen] = useState(true);
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [salaryOpen, setSalaryOpen] = useState(false);
  const [feesOpen, setFeesOpen] = useState(false);

  const menus = [
    { name: "Dashboard", link: "/Admin", icon: MdOutlineDashboard },
    { name: "Profile", link: "/Admin/profile", icon: AiOutlineUser },
    {
      name: "Attendance",
      link: "#",
      icon: MdOutlineAssignment,
      submenu: [
        { name: "Teacher Attendance", link: "/Admin/teacher-attendance", icon: MdOutlineAssignment },
        // { name: "Student Attendance", link: "#", icon: MdOutlineAssignment },
        // { name: "Self Attendance", link: "#", icon: MdOutlineAssignment }
      ]
    },
    {
      name: "Fees Payment",
      link: "#",
      icon: FaCreditCard,
      submenu: [
        { name: "Student Fees", link: "/Admin/fees-calculator", icon: FaCreditCard },
        { name: "Paid Fees", link: "/Admin/fees-table", icon: FaCreditCard }
      ]
    },
    {
      name: "Salary",
      link: "#",
      icon: FaMoneyBillWave,
      submenu: [
        { name: "Salary Calculator", link: "/Admin/salary-calculator", icon: FaMoneyBillWave },
        { name: "Salary Credited", link: "/Admin/salary-credited", icon: FaMoneyBillWave }
      ]
    },
    // { name: "Mark List", link: "/", icon: FaListAlt, margin: true },
    { name: "Students List", link: "/Admin/student-list", icon: FaListAlt },
    { name: "Teachers List", link: "/Admin/teacher-list", icon: FaListAlt },
    { name: "Leave", link: "/Admin/teacher-list", icon: FaListAlt },
    {
      name: "Logout",
      icon: LuLogOut,
      margin: true,
      onClick: handleLogout,
    },
  ];

  const toggleAttendanceMenu = () => {
    setAttendanceOpen(!attendanceOpen);
  };

  const toggleFeesMenu = () => {
    setFeesOpen(!feesOpen);
  };

  const toggleSalaryMenu = () => {
    setSalaryOpen(!salaryOpen);
  };

  const renderSubMenu = (menu, menuOpen) => (
    <div className="pl-8">
      {menu.submenu.map((submenu, j) => (
        <Link
          to={submenu.link}
          key={j}
          className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
        >
          <div>{React.createElement(submenu.icon, { size: "20" })}</div>
          <h2
            style={{
              transitionDelay: `${j + 3}00ms`,
            }}
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
          >
            {submenu.name}
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
          >
            {submenu.name}
          </h2>
        </Link>
      ))}
    </div>
  );

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex items-center justify-between">
          <span className={`text-lg font-semibold ${!open && 'hidden'}`}>{userInfo?.name || 'User'}</span>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, i) => (
            <div key={i}>
              {!menu.submenu ? (
                menu.name === "Logout" ? (
                  <button
                    onClick={menu.onClick}
                    className={` w-full ${menu.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                  >
                    <div>{React.createElement(menu.icon, { size: "20" })}</div>
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                    >
                      {menu.name}
                    </h2>
                  </button>
                ) : (
                  <Link
                    to={menu.link}
                    className={` ${menu.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                  >
                    <div>{React.createElement(menu.icon, { size: "20" })}</div>
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                    >
                      {menu.name}
                    </h2>
                    <h2
                      className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                    >
                      {menu.name}
                    </h2>
                  </Link>
                )
              ) : (
                <div>
                  <div
                    className={` ${menu.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer`}
                    onClick={() => {
                      if (menu.name === "Attendance") toggleAttendanceMenu();
                      if (menu.name === "Fees Payment") toggleFeesMenu();
                      if (menu.name === "Salary") toggleSalaryMenu();
                    }}
                  >
                    <div>{React.createElement(menu.icon, { size: "20" })}</div>
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                    >
                      {menu.name}
                    </h2>
                    {open && (
                      <div className="ml-auto">
                        {(menu.name === "Attendance" && attendanceOpen) ||
                        (menu.name === "Fees Payment" && feesOpen) ||
                        (menu.name === "Salary" && salaryOpen) ? (
                          <IoIosArrowUp size={20} />
                        ) : (
                          <IoIosArrowDown size={20} />
                        )}
                      </div>
                    )}
                  </div>
                  {menu.name === "Attendance" && attendanceOpen && open && renderSubMenu(menu, attendanceOpen)}
                  {menu.name === "Fees Payment" && feesOpen && open && renderSubMenu(menu, feesOpen)}
                  {menu.name === "Salary" && salaryOpen && open && renderSubMenu(menu, salaryOpen)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficeSidebar;
