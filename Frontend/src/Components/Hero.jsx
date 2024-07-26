import React from 'react';
import Collegepic from '../assets/slide1.jpg';
import Typewriter from 'typewriter-effect';
import { motion } from "framer-motion"

const container=(delay)=>({
    hidden:{ x:-100, opacity:0 },
    visible:{
     x:0,
     opacity:1,
     transition:{ duration:0.5, delay:delay}
    }
 })
 
const Hero = () => {
    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4 mx-4 mb-20 md:mx-10'>
            <div className='w-full md:mt-20'>
                <div className="md:px-4">
                    <div className='bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-2xl sm:text-3xl md:text-3xl tracking-tight text-transparent'>
                        <Typewriter
                            options={{
                                strings: ['CHMM COLLEGE FOR ADVANCED STUDIES'],
                                autoStart: true,
                                loop: true,
                                delay: 120,
                                deleteSpeed: 80,
                            }}
                        />
                    </div>
                    <motion.p 
          variants={container(0)}
          initial="hidden"
          animate="visible"
           className='my-2 py-6 font-light text-slate-200 tracking-tighter'>The CHMM College for advanced studies is a premier Muslim minority educational institution of high reputation in the self financing sector in Thiruvananthapuram District. It is located near NH 47, Kollam Thiruvananthapuram stretch 3 Km away from Parippally junction and 8 Km away from Varkala railway station. The college and other institutions are run by METCA (Muslim Education Trust for Coastal Area).</motion.p>
                </div>
            </div>
            <div className='w-full flex justify-center items-center md:mt-10'>
                <div className="max-w-xxl mx-auto">
                    <motion.img 
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x:0, opacity:1 }}
                        transition={{ duration: 1, delay:0.7}}
                        src={Collegepic} 
                        alt='profilepic' 
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
