// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbars from './Components/Navbars';
import Hero from './Components/Hero';
import Course from './Components/Course';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import OfficeRegistration from './Components/OfficeRegistration';
import LoginForm from './Components/LoginForm';
import StudentLogin from './Components/StudentLogin';
import TeacherLogin from './Components/TeacherLogin';
import ParentLogin from './Components/ParentLogin';
import StudentRegistration from './Components/StudentRegistration';
import TeacherRegistration from './Components/TeacherRegistration';
import ParentRegistration from './Components/ParentRegistration';
import AdminPage from './Components/AdminPage';
import StudentPage from './Components/StudentPage';
import TeacherPage from './Components/TeacherPage';
import ParentPage from './Components/ParentPage';
import Home from './Components/Home';
import StudentProfile from './Components/StudentProfile';
import TeacherProfile from './Components/TeacherProfile';
import ParentProfile from './Components/ParentProfile';
import AdminProfile from './Components/AdminProfile';
import StudentAttendance from './Components/StudentAttendance';
import ViewStudentAttendance from './Components/ViewStudentAttendance';
import TeacherStudentAttendance from './Components/TeacherStudentAttendance';
import TeacherAttendance from './Components/TeacherAttendance'
import ViewTeacherAttendance from './Components/ViewTeacherAttendance';
import NoteAdding from './Components/NoteAdding';
import StudentList from './Components/StudentList';
import AddedNotes from './Components/AddedNotes';
import StudentNotes from './Components/StudentNotes';
import VideoAdding from './Components/VideoAdding';
import AddedVideo from './Components/AddedVideo';
import VideoScreen from './Components/VideoScreen';
import StudentVideoTable from './Components/StudentVideoTable';
import StudentVideoScreen from './Components/StudentVideoScreen';
import QuestionAdding from './Components/QuestionAdding';
import AddedQuestion from './Components/AddedQuestion';
import StudentQuestionPapers from './Components/StudentQuestionPapers';
import StudentAnswerSubmit from './Components/StudentAnswerSubmit';
import AnswerSheet from './Components/AnswerSheet';
import MarkAdding from './Components/MarkAdding';
import AddedMarks from './Components/AddedMarks';
import StudentMarks from './Components/StudentMarks'
import Chats from './Components/Chats/Chats';
import StudentChats from './Components/Chats/StudentChats';
import Messages from './Components/Chats/Messages/messages';
import TeacherChats from '../src/Components/ParentChats/TeacherChats';
import ParentChats from '../src/Components/ParentChats/ParentChats';
import ChildDetails from './Components/ChildDetails';
import ChildAttendance from './Components/ChildAttendance';
import ChildMarks from './Components/ChildMarks';
import OfficeStudentList from './Components/OfficeStudentList';
import OfficeTeachers from './Components/OfficeTeachers';
import OfficeTeacherAttendance from './Components/OfficeTeacherAttendance';
import Lobby from './Components/Screens/Lobby';
import VideoCall from './Components/Screens/VideoCall';
import ParentLobby from './Components/Screens/ParentLobby';
import VideoCallReceiver from './Components/Screens/VideoCallReciever';
import SalaryCalculator from './Components/SalaryCalculator';
import SalaryCredited from './Components/SalaryCredited'
import FeesCalculator from './Components/FeesCalculator';
import FeesTable from './Components/FeesTable';
import ParentFees from './Components/ParentFees';
import PaidFeesDetails from './Components/PaidFeesDetails';
import TeacherSalaryTable from './Components/TeacherSalaryTable';
import ParentspaidedFees from './Components/ParentspaidedFees';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userName = userInfo?.name || 'User';
  return (
    <Router>
      <div className="bg-slate-950" style={{ overflowX: 'hidden' }}>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className='container mx-auto px-8' style={{ overflowX: 'hidden' }}>
                  <Navbars />
                  <Hero />
                  <Course />
                  <Contact />
                  <Footer />
                </div>
              </>
            }
          />
          <Route path="/office-registration" element={<OfficeRegistration />} />
          <Route path="/student-registration" element={<StudentRegistration />} />
          <Route path="/teacher-registration" element={<TeacherRegistration />} />
          <Route path="/parent-registration" element={<ParentRegistration />} />
          <Route path="/office-login" element={<LoginForm />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/parent-login" element={<ParentLogin />} />
          <Route path="/Admin" element={<AdminPage />} >
          <Route index element={<div className="m-3 text-xl text-white font-semibold">Welcome {userName},</div>} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="student-list" element={<OfficeStudentList />} />
            <Route path="teacher-list" element={<OfficeTeachers />} />
            <Route path="teacher-attendance" element={<OfficeTeacherAttendance />} />
            <Route path="salary-calculator" element={<SalaryCalculator />} />
            <Route path="salary-credited" element={<SalaryCredited />} />
            <Route path="fees-calculator" element={<FeesCalculator />} />
            <Route path="fees-table" element={<ParentspaidedFees />} />
           

          </Route>

          <Route path="/Student" element={<StudentPage />}>
            <Route index element={<div className="m-3 text-xl text-white font-semibold">Welcome {userName},</div>} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="Attendance" element={<StudentAttendance />} />
            <Route path="ViewAttendance" element={<ViewStudentAttendance />} />
            <Route path="Added-Notes" element={<StudentNotes />} />
            <Route path="student-video" element={<StudentVideoTable />} />
            <Route path="video-screen/:videoId" element={<StudentVideoScreen/>} />
            <Route path="Question-Papers" element={<StudentQuestionPapers />} />
            <Route path="submit-answer" element={<StudentAnswerSubmit />} />
            <Route path="student-marks" element={<StudentMarks/>} />
            <Route path="student-chats" element={<StudentChats/>} />
            <Route path="online-class" element={<Lobby/>} />
          </Route>
          <Route path="/Teacher" element={<TeacherPage />}>
          <Route index element={<div className="m-3 text-xl text-white font-semibold">Welcome {userName},</div>} />
            <Route path="profile" element={<TeacherProfile />} />
            <Route path="teacher-Attendance" element={<TeacherAttendance />} />
            <Route path="student-attendance" element={<TeacherStudentAttendance />} />
            <Route path="view-attendance" element={<ViewTeacherAttendance />} />
            <Route path="student-list" element={<StudentList/>} />
            <Route path="note-adding" element={<NoteAdding/>} />
            <Route path="note-added" element={<AddedNotes/>} />
            <Route path="video-adding" element={<VideoAdding/>} />
            <Route path="videos-added" element={<AddedVideo/>} />
            <Route path="videos-added" element={<AddedVideo/>} />
            <Route path="video-screen/:videoId" element={<VideoScreen/>} />
            <Route path="question-uploading" element={<QuestionAdding/>} />
            <Route path="questions-added" element={<AddedQuestion/>} />
            <Route path="answer-table" element={<AnswerSheet/>} /> 
            <Route path="mark-adding" element={<MarkAdding/>} /> 
            <Route path="added-marks" element={<AddedMarks/>} /> 
            <Route path="Chats" element={<Chats/>} />
            <Route path="Chats-parent" element={<TeacherChats/>} />
            <Route path="lobby-screen" element={<Lobby/>} />
            <Route path="online-class" element={<Lobby/>} />
            <Route path="teacher-salarytab" element={<TeacherSalaryTable/>} />

            
          


            <Route path="/Teacher/messages/:studentId" element={<Messages />} />

           

          </Route>
          

          <Route path="/Parent" element={<ParentPage />} >
          <Route index element={<div className="m-3 text-xl text-white font-semibold">Welcome {userName},</div>} />
            <Route path="profile" element={<ParentProfile />} />
            <Route path="child-details" element={<ChildDetails />} />
            <Route path="child-attendance" element={<ChildAttendance />} />
            <Route path="child-marks" element={<ChildMarks />} />
            <Route path="child-chats" element={<ParentChats />} />
            <Route path="lobby-screen" element={<Lobby />} />
            <Route path="fees-table" element={<FeesTable />} />
            <Route path="/Parent/parent-fees-form/:studentId" element={<ParentFees />} />
            <Route path="paided-details" element={<PaidFeesDetails />} />
           
          </Route>

          <Route path="/room/:roomNumber" element={< VideoCall/>} />

         

        </Routes>
      </div>
    </Router>
  );
};

export default App;
