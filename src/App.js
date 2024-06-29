import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/cors/Auth/OpenRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Cart from "../src/components/cors/Dashboard/Cart"
import MyProfile from "./components/cors/Dashboard/MyProfile";
import PrivateRoute from "./components/cors/Auth/PrivateRoute";
import Error from "./pages/Error";
import Contact from "./pages/Contact";
import EnrolledCourses from "./components/cors/Dashboard/EnrolledCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/cors/Dashboard/AddCourse";
import MyCourses from "./components/cors/Dashboard/MyCourses";
import EditCourse from "./components/cors/Dashboard/EditCourse";

function App() {
  const { user } = useSelector((state) => state.profile)
  return (
    
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
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
          path="about"
          element={
            // <OpenRoute>
              <About />
            // </OpenRoute>
          }
        />
        <Route path="/contact" element={<Contact/>}/>
       
        <Route 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
    <Route path="dashboard/my-profile" element={<MyProfile />} />

    {
      user?.accountType === ACCOUNT_TYPE.STUDENT && (
        <>
        <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
        <Route path="dashboard/cart" element={<Cart />} />
        </>
      )
    }

    {
      user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
        <>
        <Route path="dashboard/add-course" element={<AddCourse />} />
        <Route path="dashboard/my-courses" element={<MyCourses />} />
        <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />

        </>
      )
    }


    </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
