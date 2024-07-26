import React, { useState, useEffect } from 'react';
import { useGetStudentsQuery, useUpdateStudentsMutation } from '../Slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import regpic from '../assets/cat.jpg';

const StudentProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!userInfo) {
    navigate('/student-login');
    return null;
  }

  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [course, setCourse] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { data: studentData, isLoading, error } = useGetStudentsQuery();
  const [updateStudent] = useUpdateStudentsMutation();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (studentData) {
      setName(studentData.name);
      setFatherName(studentData.fatherName);
      setMotherName(studentData.motherName);
      setPhone(studentData.phone);
      setEmail(studentData.email);
      setAddress(studentData.address);
      setCourse(studentData.course);
      setGender(studentData.gender);
    }
  }, [studentData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateStudent({
        id: userInfo.id,
        name,
        fatherName,
        motherName,
        phone,
        email,
        address,
        course,
        gender,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated successfully!');
      navigate('/Student');
    } catch (err) {
      const errorMessage = err.data?.message || err.error || 'Update Failed';
      toast.error(errorMessage);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <section className="min-h-screen flex items-center justify-center mb-24">
      <div className="bg-gray-100 flex flex-col md:flex-row rounded-2xl shadow-lg max-w-4xl p-5 items-center w-full md:w-auto">
        <div className="w-full md:w-1/2 px-4 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Update Profile</h2>
          <p className="text-xs mt-4 text-[#002D74]">Update your profile information</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              className="p-2 mt-8 rounded-xl border w-full"
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="p-2 rounded-xl border w-full"
              type="text"
              name="fatherName"
              placeholder="Father's Name"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
            />
            <input
              className="p-2 rounded-xl border w-full"
              type="text"
              name="motherName"
              placeholder="Mother's Name"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
            />
            <input
              className="p-2 rounded-xl border w-full"
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="p-2 rounded-xl border w-full"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              className="p-2 rounded-xl border resize-none w-full"
              name="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <select
              className="p-2 rounded-xl border w-full"
              name="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              <option value="MCA">MCA</option>
              <option value="Mcom">Mcom</option>
              <option value="MBA">MBA</option>
            </select>
            <div>
              <p className="mb-2">Gender:</p>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-[#002D74]"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-[#002D74]"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password (leave blank to keep unchanged)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <svg
                onClick={togglePasswordVisibility}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                viewBox="0 0 16 16"
              >
                {showPassword ? (
                  <path
                    fillRule="evenodd"
                    d="M15.112 7.612c.96 1.197 1.816 2.522 2.416 3.388-.4.52-1.46 1.48-2.481 2.475-1.017-.992-2.073-1.947-2.477-2.464.603-.87 1.467-2.191 2.542-3.399zm-14.225-.224a13.133 13.133 0 0 1 1.66-2.043c1.37-1.789 3.13-2.957 5.25-2.957 2.12 0 3.879 1.168 5.168 2.457a13.133 13.133 0 0 1 1.655 2.043c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457a13.134 13.134 0 0 1-1.17-1.751c-.073-.105-.137-.201-.195-.288z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M8 5.5c-.96 0-1.875.325-2.617.877L8 8.586l2.617-2.21A3.478 3.478 0 0 0 8 5.5z"
                  />
                )}
              </svg>
            </div>
            <button
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              type="submit"
            >
              Update Profile
            </button>
          </form>
        </div>
        <div className="hidden md:block w-1/2">
          <img className="rounded-2xl" src={regpic} alt="Illustration" />
        </div>
      </div>
    </section>
  );
};

export default StudentProfile;
