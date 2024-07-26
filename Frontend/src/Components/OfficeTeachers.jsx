import React from 'react';
import { useSelector } from 'react-redux';
import { useRetrivalTeachersQuery } from '../Slices/userApiSlice'; 
import { useNavigate } from 'react-router-dom';

const OfficeTeachers = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    if (!userInfo) {
        navigate('/office-login');
        return null;
    }

    const { data: teachers, error, isLoading } = useRetrivalTeachersQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching teachers: {error.message}</div>;
    }

    return (
        <div className='p-3'>
            <h1 className='m-3 text-xl text-white font-semibold underline'>Teacher List</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Phone</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Address</th>
                            <th scope="col" className="px-6 py-3">Course</th>
                            <th scope="col" className="px-6 py-3">Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map(teacher => (
                            <tr key={teacher._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{teacher.name}</td>
                                <td className="px-6 py-4">{teacher.phone}</td>
                                <td className="px-6 py-4">{teacher.email}</td>
                                <td className="px-6 py-4">{teacher.address}</td>
                                <td className="px-6 py-4">{teacher.course}</td>
                                <td className="px-6 py-4">{teacher.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OfficeTeachers;
