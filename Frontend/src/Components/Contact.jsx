import { useState } from 'react';
import Contactpic from '../assets/contact.png';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
 import { useCreateMessageMutation } from '../Slices/userApiSlice';

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay }
  }
});

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendMessage] = useCreateMessageMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendMessage({ name, email, message }).unwrap();
      console.log('Message sent successfully!');
      toast.success('Message sent successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Error sending message. Please try again.');
    }
  };

  return (
    <div>
      <motion.div
        whileInView={{ y: 0, opacity: 1 }}
        initial={{ y: -100, opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="w-full flex justify-center items-center mb-8"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-white md:mt-20 mb-10">
          Contact Us
        </h1>
      </motion.div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4 mx-4 mb-20 md:mx-10'>
        <motion.div
          whileInView={{ x: 0, opacity: 1 }}
          initial={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full md:mt-20'
        >
          <div className="md:px-4">
            <h1 className='relative mb-8 '>
              <span className='bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-2xl sm:text-3xl md:text-3xl tracking-tight text-transparent'>
                Join Us Today
              </span>
              <span className='absolute left-0 bottom-0 h-0.5 w-40 md:w-48 bg-pink-300'></span>
            </h1>
            <form class="max-w-sm mx-auto md:mt-10"onSubmit={handleSubmit}>
              <div class="mb-5">
              <label htmlFor="name"className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
          <input
            type="text"
            id="name"
            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
              </div>
              <div class="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
          <input
            type="email"
            id="email"
            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
              </div>
              <div class="mb-5">
              <label htmlFor="message"className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message:</label>
          <textarea
            id="message"
            value={message}
            rows="4" 
            className="block p-2.5 w-full text-sm text-black bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."
            onChange={(e) => setMessage(e.target.value)}
          />
              </div>
              <button type="submit" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-5 md:mt-2">Submit</button>
            </form>
          </div>
        </motion.div>
        <motion.div
          whileInView={{ x: 0, opacity: 1 }}
          initial={{ x: 100, opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className='w-full flex justify-center items-center md:mt-10'
        >
          <div className="max-w-xxl mx-auto">
            <motion.img
              src={Contactpic}
              alt='contactpic'
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;