import React from 'react';
import Mcapic from '../assets/cs.jpg';
import Mbapic from '../assets/bussiness.jpg';
import Mcompic from '../assets/commerce.jpg';
import { motion } from 'framer-motion';

const Course = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <motion.div
        whileInView={{ opacity:1, y:0 }}
        initial={{ opacity:0, y:-100 }}
        transition={ { duration:1.5 } }
        className="w-full flex justify-center items-center mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-white md:mt-20 mb-10">
          Courses
        </h1>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:mt-20">
        <motion.div
          className="max-w-md rounded overflow-hidden shadow-lg relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div style={{ paddingBottom: '75%' }} className="relative">
            <img
              src={Mcapic}
              className="absolute object-cover w-full h-full"
              alt="Mcaimg"
            />
          </div>
          <div className="m-4">
            <div className="font-bold text-xl mb-2 text-white">MCA</div>
            <p className="text-base text-white">
              Our MCA course is designed to equip you with an in-depth knowledge
              of how computers work and how that knowledge can be applied to
              design and implement the systems of the future. Coupled with an
              impressive range of valuable transferable skills such as problem
              solving, project management and independent research
            .
            </p>
          </div>
        </motion.div>
        <motion.div
          className="max-w-md rounded overflow-hidden shadow-lg relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div style={{ paddingBottom: '75%' }} className="relative">
            <img
              src={Mbapic}
              className="absolute object-cover w-full h-full"
              alt="Mbapic"
            />
          </div>
          <div className="m-4">
            <div className="font-bold text-xl mb-2 text-white">MBA</div>
            <p className="text-base text-white">
              Our MBA program provides a strong foundation in business principles
              and practices, preparing you for leadership roles in various
              sectors. Through our comprehensive curriculum and hands-on
              experience, you'll develop the skills needed to excel in today's
              competitive business environment.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="max-w-md rounded overflow-hidden shadow-lg relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div style={{ paddingBottom: '75%' }} className="relative">
            <img
              src={Mcompic}
              className="absolute object-cover w-full h-full"
              alt="Mcompic"
            />
          </div>
          <div className="m-4">
            <div className="font-bold text-xl mb-2 text-white">Commerce</div>
            <p className="text-base text-white">
              Our Commerce program offers a comprehensive understanding of
              economic and financial principles, preparing you for careers in
              accounting, finance, or business administration. With a strong
              focus on practical skills and real-world applications, you'll be
              ready to tackle the challenges of the business world.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Course;
