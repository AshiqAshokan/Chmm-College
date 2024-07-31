import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';
const STUDENTS_URL = '/api/students';
const TEACHERS_URL = '/api/teachers';
const PARENTS_URL = '/api/parents';
const ATTENDANCE_URL = '/api/markAttendance';
const NOTES_URL = '/api/notes';
const VIDEO_URL ='/api/videos'
const QUESTION_URL ='/api/question'
const ANSWER_URL ='/api/answer'
const Mark_URL ='/api/mark'
const MESSAGES_URL = '/api/messages'
const PAYMENT_URL ='/api/payments'
const FEES_URL ='/api/fees'
const COMMENTS_URL='/api/comments'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    registerStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    studentLogin: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    registerTeacher: builder.mutation({
      query: (data) => ({
        url: `${TEACHERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    teacherLogin: builder.mutation({
      query: (data) => ({
        url: `${TEACHERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    registerParent: builder.mutation({
      query: (data) => ({
        url: `${PARENTS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    // New mutation for parent login
    parentLogin: builder.mutation({
      query: (data) => ({
        url: `${PARENTS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logoutTeacher: builder.mutation({
      query: () => ({
        url: `${TEACHERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    logoutStudent:builder.mutation({
      query: () => ({
        url: `${STUDENTS_URL}/logout`, 
        method: 'POST',
      }),
    }),
    logoutParent:builder.mutation({
      query: () => ({
        url: `${PARENTS_URL}/logout`, 
        method: 'POST',
      }),
    }),
    getStudents:builder.query({
      query: () => ({
        url: `${STUDENTS_URL}/profile`, 
        method: 'GET',
      }),
    }),

    updateStudents: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),

    getTeachers:builder.query({
      query: () => ({
        url: `${TEACHERS_URL}/profile`, 
        method: 'GET',
      }),
    }),

    updateTeachers: builder.mutation({
      query: (data) => ({
        url: `${TEACHERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    

    getParents:builder.query({
      query: () => ({
        url: `${PARENTS_URL}/profile`, 
        method: 'GET',
      }),
    }),

    updateParents: builder.mutation({
      query: (data) => ({
        url: `${PARENTS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),

    markAttendance: builder.mutation({
      query: ({userId, status, userType  }) => ({
        url: `${ATTENDANCE_URL}`,
        method: 'POST',
        body: { userId, status, userType  }, // Pass studentId and status in the request body
      }),
    }),



    getAttendance: builder.query({
      query: (userId) => ({
        url: `${ATTENDANCE_URL}/attendance/?userId=${userId}`,
        method: 'GET',
      }),
    }),

    getTeacherStudentAttendance: builder.query({
      query: ({ course }) => {
          const url = `${ATTENDANCE_URL}/studentattendance/${course}`;
          console.log("Requesting URL:", url);
          return {
              url,
              method: 'GET',
          };
      },
  }),

  getStudentList: builder.query({
    query: ({ course }) => {
        const url = `${TEACHERS_URL}/studentlist/${course}`;
        console.log("Requesting URL:", url);
        return {
            url,
            method: 'GET',
        };
    },
}),
    

postNote: builder.mutation({
  query: (formData) => ({
    url: `${NOTES_URL}`,
    method: 'POST',
    body: formData,
  
  }),
}),

getNotes: builder.query({
  query: () => ({
    url: `${NOTES_URL}/teachernotes`,
    method: 'GET',
  }),
}),

getStudentNotes:builder.query({
  query: (course) => ({
    url: `${STUDENTS_URL}/studentnotes`,
    method: 'GET',
    params: { course },
  }),
}),

addVideo: builder.mutation({
  query: (videoData) => ({
    url: `${VIDEO_URL}`,
    method: 'POST',
    body: videoData,
  }),
}),
    

getVideos:builder.query({
  query: (userId) => ({
    url: `${VIDEO_URL}/teachervideos`,
    method: 'GET',
    params: { userId },
  }),
}),

getVideoPlay:builder.query({
  query: (videoId) => ({
    url: `${VIDEO_URL}/videoplay`,
    method: 'GET',
    params: { videoId },
  }),
}),

getStudentVideo:builder.query({
  query: (course) => ({
    url: `${STUDENTS_URL}/studentvideo`,
    method: 'GET',
    params: { course },
  }),
}),

postQuestion: builder.mutation({
  query: (formData) => ({
    url: `${QUESTION_URL}`,
    method: 'POST',
    body: formData,
  
  }),
}),

getQuestion: builder.query({
  query: () => ({
    url: `${QUESTION_URL}/teacherquestion`,
    method: 'GET',
  }),
}),

getStudentQuestion:builder.query({
  query: (course) => ({
    url: `${STUDENTS_URL}/studentquestion`,
    method: 'GET',
    params: { course },
  }),
}),

postAnswer: builder.mutation({
  query: (formData) => ({
    url: `${ANSWER_URL}`,
    method: 'POST',
    body: formData,
  
  }),
}),

getAnswer:builder.query({
  query: (teacherId) => ({
    url: `${ANSWER_URL}/studentanswers`,
    method: 'GET',
    params: { teacherId },
  }),
}),

addMark: builder.mutation({
  query: (formData) => ({
      url: `${Mark_URL}`,
      method: 'POST',
      body: formData,
  }),
}),

getMarks: builder.query({
  query: (teacherId) => `${Mark_URL}?teacherId=${teacherId}`,
}),

getStudentMarks: builder.query({
  query: (studentId) => `${STUDENTS_URL}?studentId=${studentId}`,
}),


sendMessage: builder.mutation({
  query: (data) => ({
    url: `${MESSAGES_URL}/post/${data.receiverId}`,
    method: 'POST',
    body: { message: data.message, userType: data.userType }, // Include userType in the body
  }),
}),


fetchMessages: builder.query({
  query: ({ receiverId, course }) => {
    console.log('Fetching messages for receiver ID:', receiverId, 'and course:', course);
    return {
      url: `${MESSAGES_URL}/getmessage/${receiverId}/${course}`,
      method: 'GET',
    };
  },
}),



getTeacherList: builder.query({
  query: ({ course }) => {
      const url = `${STUDENTS_URL}/teacherlist/${course}`;
      console.log("Requesting URL:", url);
      return {
          url,
          method: 'GET',
      };
  },
}),

getStudentById: builder.query({
  query: (studentId) => ({
    url: `${PARENTS_URL}/${studentId}`,
    method: 'GET',
  }),
}),

getStudentAttendance: builder.query({
  query: (attendanceId) => ({
    url: `${PARENTS_URL}/attendance/${attendanceId}`,
    method: 'GET',
  }),
}),

getStudentMark: builder.query({
  query: (markId) => ({
    url: `${PARENTS_URL}/marks/${markId}`,
    method: 'GET',
  }),
}),



getParentList: builder.query({
  query: ({ course }) => {
      const url = `${PARENTS_URL}/parentscourse/${course}`;
      console.log("Requesting URL:", url);
      return {
          url,
          method: 'GET',
      };
  },
}),

getTeachersListp: builder.query({
  query: ({ course }) => {
      const url = `${TEACHERS_URL}/teacherscourse/${course}`;
      console.log("Requesting URL:", url);
      return {
          url,
          method: 'GET',
      };
  },
}),

RetrivalStudents: builder.query({
  query: () => ({
    url: `${USERS_URL}/officestudents`, 
    method: 'GET',
  }),
}),

RetrivalTeachers: builder.query({
  query: () => ({
    url: `${USERS_URL}/officeteachers`, 
    method: 'GET',
  }),
}),

RetrivalTeachersAttendance: builder.query({
  query: () => ({
    url: `${USERS_URL}/officeteachersattendance`, 
    method: 'GET',
  }),
}),

getTeacherDetails: builder.query({
  query: (teacherId) => ({
    url: `${ATTENDANCE_URL}/teacherdetails/${teacherId}`,
    method: 'GET',
  }),
}),

createRazorpayOrder: builder.mutation({
  query: (amount) => ({
    url: `${PAYMENT_URL}/order`,
    method: 'POST',
    body: { amount },
  }),
}),

verifyRazorpayPayment: builder.mutation({
  query: (paymentDetails) => ({
    url: `${PAYMENT_URL}/verify`,
    method: 'POST',
    body: paymentDetails,
  }),
}),

transferSalary: builder.mutation({
  query: ({ teacherId, teacherName, amount, orderId, transactionId }) => ({
    url: `${PAYMENT_URL}/transfer`,
    method: 'POST',
    body: { teacherId,  teacherName, amount, orderId, transactionId },
  }),
}),

getSalaryDetails: builder.query({
  query: () => ({
    url: `${PAYMENT_URL}/salaries`,
    method: 'GET',
  }),
}),

getStudentDetails: builder.query({
  query: (studentId) => ({
    url: `${STUDENTS_URL}/studentdetails/${studentId}`,
    method: 'GET',
  }),
}),

postFees: builder.mutation({
  query: (feeData) => ({
    url: `${FEES_URL}`,
    method: 'POST',
    body: feeData,
  }),
}),

RetrivalStudentsDetails: builder.query({
  query: (studentId) => `${STUDENTS_URL}/retrivelstudents/${studentId}`,
}),

fetchStudentDetailsForFees: builder.query({
  query: (studentId) => `${FEES_URL}/feestudent/${studentId}`,
}),

createPayment: builder.mutation({
  query: (amount) => ({
    url: `${FEES_URL}/order`,
    method: 'POST',
    body: { amount },
  }),
}),
verifyPayment: builder.mutation({
  query: (paymentData) => ({
    url: `${FEES_URL}/verify`,
    method: 'POST',
    body: paymentData,
  }),
}),
updatePaymentStatus: builder.mutation({
  query: ({studentId, amount, orderId, transactionId}) => ({
    url: `${FEES_URL}/transfer`,
    method: 'POST',
    body: {studentId, amount, orderId, transactionId},
  }),
}),

fetchFeesDetails: builder.query({
  query: (studentId) => {
    const url = `${FEES_URL}/feesdetails/${studentId}`;
    console.log('Fetching fees details from URL:', url);
    return {
      url,
      method: 'GET',
    };
  },
}),

fetchTeacherSalary:builder.query({
  query: (teacherId) => {
    const url = `${PAYMENT_URL}/fetchteachersalary/${teacherId}`;
    console.log('Fetching fees details from URL:', url);
    return {
      url,
      method: 'GET',
    };
  },
}),

createMessage: builder.mutation({
  query: (data) => ({
    url: `${COMMENTS_URL}/messages`,
    method: 'POST',
    body: data,
  }),
})



    
  }),
});



export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useRegisterStudentMutation,
  useStudentLoginMutation,
  useRegisterTeacherMutation,
  useTeacherLoginMutation,
  useRegisterParentMutation,
  useParentLoginMutation,
  useLogoutTeacherMutation,
  useLogoutStudentMutation,
  useLogoutParentMutation,
  useGetStudentsQuery,
  useUpdateStudentsMutation,
  useGetTeachersQuery,
  useUpdateTeachersMutation,
  useGetParentsQuery,
  useUpdateParentsMutation,
  useMarkAttendanceMutation,
  useGetAttendanceQuery,
  useGetTeacherStudentAttendanceQuery,
  useGetStudentListQuery,
  usePostNoteMutation,
  useGetNotesQuery,
  useGetStudentNotesQuery,
  useAddVideoMutation,
  useGetVideosQuery,
  useGetVideoPlayQuery,
  useGetStudentVideoQuery,
  usePostQuestionMutation,
  useGetQuestionQuery,
  useGetStudentQuestionQuery,
  usePostAnswerMutation,
  useGetAnswerQuery,
  useAddMarkMutation,
  useGetMarksQuery,
  useGetStudentMarksQuery,
  useSendMessageMutation,
  useFetchMessagesQuery,
  useGetTeacherListQuery,
  useGetStudentByIdQuery,
  useGetStudentAttendanceQuery,
  useGetStudentMarkQuery,
  useGetParentListQuery,
  useGetTeachersListpQuery,
  useRetrivalStudentsQuery,
  useRetrivalTeachersQuery,
  useRetrivalTeachersAttendanceQuery,
  useGetTeacherDetailsQuery,
  useCreateRazorpayOrderMutation,
  useVerifyRazorpayPaymentMutation,
  useTransferSalaryMutation,
  useGetSalaryDetailsQuery,
  useGetStudentDetailsQuery,
  usePostFeesMutation,
  useRetrivalStudentsDetailsQuery,
  useFetchStudentDetailsForFeesQuery,
  useCreatePaymentMutation,
   useVerifyPaymentMutation, 
   useUpdatePaymentStatusMutation,
   useFetchFeesDetailsQuery,
   useFetchTeacherSalaryQuery,
   useCreateMessageMutation,
  
  



  
  
} = userApiSlice;