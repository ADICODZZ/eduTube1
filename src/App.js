import './App.css'
import {Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Catalog from './pages/Catalog';
import Dashboard from "./pages/Dashboard";
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
//import Catalog from "./pages/Catalog";
import Error from "./pages/Error";
import OpenRoute from './components/core/Auth/OpenRoute';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import MyProfile from './components/core/Dashboard/MyProfile';
import Settings from './components/core/Dashboard/Settings/index';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import AddCourse from "./components/core/Dashboard/AddCourse/index";
import MyCourses from "./components/core/Dashboard/MyCourses/MyCourses";
import EditCourse from './components/core/Dashboard/EditCourse/EditCourse';
import { ACCOUNT_TYPE } from "./utils/constants";
import Cart from "./components/core/Dashboard/Cart/index";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { setProgress } from "./slices/loadingBarSlice";
import CourseDetails from "./pages/CourseDetails";
import VideoDetails from './components/core/ViewCourse/VideoDetails';
import ViewCourse from './pages/ViewCourse';
import InstructorDashboard from './components/core/Dashboard/InstructorDashboard/InstructorDashboard';
const App=() =>{
  const user = useSelector((state) => state.profile.user);
  const progress = useSelector((state) => state.loadingBar);
  const dispatch = useDispatch();
  return (
    <div className='w-screen min-h-screen bg-[#0f0f0f]  flex flex-col font-inter'>
        <LoadingBar
        color="red"
        height={1.4}
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/catalog/:catalog" element={<Catalog/>}/>
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/contact" element={<ContactUs/>}/>

        
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

         <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }>

          <Route path="/dashboard/my-profile" element={<MyProfile/>}/> 
          <Route path="/dashboard/settings" element={<Settings/>}/> 
          <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
          

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              /> 
           </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/instructor" element={<InstructorDashboard />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
              
            </>
          )}

        </Route>

        <Route
        element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
               
              <Route
                path="/dashboard/enrolled-courses/view-course/:courseId/section/:sectionId/sub-section/:subsectionId"
                element={<VideoDetails />}
              />
              
            </>
          )}

        </Route>


        
        <Route path="*" element={<Error/>}/>

      </Routes>
      <Footer/>
      
    </div>
    
  )
}

export default App
