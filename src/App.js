import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings";
import EnrollCourses from "./components/core/Dashboard/EnrollCourse/EnrollCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetais from "./components/core/ViewCourse/VideoDetais";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import { useEffect } from "react";
import { getUserDetails } from "./services/operation/ProfileAPI";

function App() {

  const {user} = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    // THIS IS OUR TOP LEVEL DIV
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/catalog/:catalogName" element={<Catalog/>} />
        <Route path="/courses/:courseId" element={<CourseDetails/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route
          path="signup" 
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          } />
        <Route 
          path="login" 
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          } />
        <Route 
          path="forgot-password" 
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          } />

        <Route 
          path="update-password/:id" 
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          } />

        <Route 
          path="verify-email" 
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          } />

        <Route 
          path="about" 
          element={
            
              <About />
            
          } />

        <Route 
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="/dashboard/settings" element={<Settings/>}/>
          
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="/dashboard/enrolled-courses" element={<EnrollCourses/>}/>
              <Route path="/dashboard/cart" element={<Cart/>}/>
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              <Route path="/dashboard/add-course" element={<AddCourse/>}/>
              <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
              <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>
              <Route path="/dashboard/instructor" element={<Instructor/>}/>
              </>
            )
          }
        </Route>

        <Route element={
         <PrivateRoute>
          <ViewCourse/>
         </PrivateRoute>
        }>
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
              path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetais />}
               />
            </>
          )}
        </Route>


          <Route path="*" element={<Error/>}/>

      </Routes>
    </div>
  );
}

export default App;
