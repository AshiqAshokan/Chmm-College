import React from 'react';
import { FaGraduationCap, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import studenta from '../assets/student1.jpg';
import studentaa from '../assets/student2.jpg';
import studentaaa from '../assets/student3.jpg';
import graduation from '../assets/graduation1.jpg'
import graduations from '../assets/graduation2.jpg'
import graduationss from '../assets/graduation3.jpg'
import dance from '../assets/dance1.jpg'
import dances from '../assets/dance2.jpg'
import dancess from '../assets/dance3.jpg'



const Footer = () => {
  return (
    <div className="bg-slate-950 py-10 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
          <div className="flex flex-col justify-center items-start text-white">
            <div className="flex items-center mb-4">
              <FaGraduationCap className="text-4xl mr-2" />
              <h1 className="text-2xl font-bold">CHMM</h1>
            </div>
            <p className="mb-4">CHMM College For Advanced Studies
              Metca Land, Chavarcode
              Palayamkunnu P.O, Varkala
              Trivandrum - 695146</p>
            <p className="mb-4">Phone: 0470-260 0000</p>
            <p>Email: info@chmm.ac.in</p>
            <div className="flex mt-6">
              <a href="https://www.linkedin.com/school/c.h.m.m.-college-of-advanced-studies-palayamkunnu-varkala/" className="mr-4">
                <FaLinkedin className="text-3xl hover:text-blue-500 transition" />
              </a>
              <a href="https://www.facebook.com/tochmmcollege/" className="mr-4">
                <FaFacebook className="text-3xl hover:text-blue-500 transition" />
              </a>
              <a href="https://www.instagram.com/explore/locations/140136216690002/chmm-college-for-advanced-studies/">
                <FaInstagram className="text-3xl hover:text-blue-500 transition" />
              </a>
            </div>
          </div>
          <div className="text-white mt-20">
            <h2 className="text-xl font-bold mb-4">Pages</h2>
            <ul className="text-lg">
              <li>Home</li>
              <li>Course</li>
              <li>Contact</li>
              <li>About</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-4 mt-16">Gallery</h2>
            <div className="grid grid-cols-3 gap-4 mb-5">
              <img src={studenta} alt='mcapics' className="w-full rounded-md" />
              <img src={studentaa} alt='mbaics' className="w-full rounded-md" />
              <img src={studentaaa} alt='mcompics' className="w-full rounded-md" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-5">
              <img src={graduation} alt='mcapics' className="w-full rounded-md" />
              <img src={graduations} alt='mbaics' className="w-full rounded-md" />
              <img src={graduationss} alt='mcompics' className="w-full rounded-md" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-5">
              <img src={dance} alt='mcapics' className="w-full rounded-md" />
              <img src={dances} alt='mbaics' className="w-full rounded-md" />
              <img src={dancess} alt='mcompics' className="w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;
