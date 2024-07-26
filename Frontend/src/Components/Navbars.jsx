import React, { useState } from 'react';
import { FaGraduationCap, FaAngleDown, FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

const Navbars = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSignupDropdown, setShowSignupDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleSignupDropdown = () => {
    setShowSignupDropdown(!showSignupDropdown);
  };

  const toggleLoginDropdown = () => {
    setShowLoginDropdown(!showLoginDropdown);
  };

  return (
    <div className='flex justify-between items-center py-6 mb-20'>
      <div className='text-white flex items-center text-3xl m-5'>
        <FaGraduationCap className='text-4xl' />
        <h1>CHMM</h1>
      </div>
      
      {/* Hamburger menu icon for mobile */}
      <div className="md:hidden text-white m-5" onClick={toggleMenu}>
        <svg className="h-8 w-8 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M2 4h16v2H2V4zm0 6h16v2H2v-2zm16 4H2v2h16v-2z" />
        </svg>
      </div>
      
      {/* Desktop menu */}
      <div className='hidden md:flex m-5 items-center justify-between gap-4 text-white text-2xl'>
        <h1>Home</h1>
        <h1>About</h1>
        <h1>Contact</h1>
     
        <div className="relative">
          <button id="dropdownSignupButton" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={toggleSignupDropdown}>
            Signup
            <FaAngleDown className="w-10.5 h-10.5 ms-3" />
          </button>

          {/* Signup Dropdown menu */}
          {showSignupDropdown && (
            <div id="dropdownSignup" className="absolute mt-2 bg-white rounded-lg shadow w-44 dark:bg-slate-950">
              <ul className="text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <Link to="/student-registration" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Student</Link>
                </li>
                <li>
                  <Link to="/teacher-registration" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Teacher</Link>
                </li>
                <li>
                  <Link to="/parent-registration" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Parent</Link>
                </li>
                <li>
                  <Link to="/office-registration" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Office</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <button id="dropdownLoginButton" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={toggleLoginDropdown}>
            Login
            <FaAngleDown className="w-10.5 h-10.5 ms-3" />
          </button>

          {/* Login Dropdown menu */}
          {showLoginDropdown && (
            <div id="dropdownLogin" className="absolute mt-2 bg-white rounded-lg shadow w-44 dark:bg-slate-950">
              <ul className="text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <Link to="/student-login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Student</Link>
                </li>
                <li>
                  <Link to="/teacher-login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Teacher</Link>
                </li>
                <li>
                  <Link to="/parent-login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Parent</Link>
                </li>
                <li>
                  <Link to="/office-login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Office</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {showMenu && (
        <div className="md:hidden absolute top-24 right-0 left-0 bg-slate-950 text-white z-10">
          <div className="flex flex-col items-start p-4">
            <div className='border border-white w-full mb-5'>
              <h1 className="p-4">Home</h1>
            </div>  
            <div className='border border-white w-full mb-5'>
              <h1 onClick={toggleSignupDropdown} className="p-4 cursor-pointer flex items-center justify-between">
                Signup
                <FaAngleDown />
              </h1>
              {showSignupDropdown && (
                <div className="flex flex-col items-start p-4">
                  <div className='border border-white w-full p-4 mb-5'>
                    <Link to="/student-registration" className="cursor-pointer hover:text-gray-300">Student</Link>
                  </div>
                  <div className='border border-white w-full p-4 mb-5'>
                    <Link to="/parent-registration" className="cursor-pointer hover:text-gray-300">Parent</Link>
                  </div>
                  <div className='border border-white w-full p-4 mb-5'>
                    <Link to="/teacher-registration" className="cursor-pointer hover:text-gray-300">Teacher</Link>
                  </div>
                  <div className='border border-white w-full p-4 mb-5'>
                    <Link to="/office-registration" className="cursor-pointer hover:text-gray-300">Office</Link>
                  </div>
                </div>
              )}
            </div>  
            <div className='border border-white w-full mb-5'>
              <h1 className="p-4">Contact</h1>
            </div>  
            <div className='border border-white w-full mb-5'>
              <h1 className="p-4">About</h1>
            </div>  
            <div className='border border-white w-full mb-5'>
              <h1 onClick={toggleLoginDropdown} className="p-4 cursor-pointer flex items-center justify-between">
                Login
                <FaAngleDown />
              </h1>
              {showLoginDropdown && (
                <div className="flex flex-col items-start p-4">
                  <div className='border border-white w-full p-4 mb-5'>
                    <Link to="/student-login" className="cursor-pointer hover:text-gray-300">Student</Link>
                  </div>
                  <div className='border border-white w-full p-4 mb-5'>
                    <Link to="/parent-login" className="cursor-pointer hover:text-gray-300">Parent</Link>
                  </div>
                  <div className='border border-white w-full p-4 mb-5'>
                    <Link to="/teacher-login" className="cursor-pointer hover:text-gray-300">Teacher</Link>
                  </div>
                  <div className='border border-white w-full p-4 mb-5'>
                    <Link to="/office-login" className="cursor-pointer hover:text-gray-300">Office</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbars;
