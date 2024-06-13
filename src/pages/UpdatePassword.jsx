import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { Link, useLocation } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi"
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showConfirmPasswrod, setshowConfirmPasswrod ] = useState(false);
  const { loading } = useSelector((state) => state.auth);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const { password, confirmPassword } = formData;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };
  return (
    <div className="grid min-h-[cal(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8"> 
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Chosse new password</h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Atmost done. Enter your new password and you are all set</p>
          <form onSubmit={handleOnSubmit}>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password <sup className="text-pink-200">*</sup></p>
              <input
              className="form-style w-full h-10 p-3 border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square focus:border-0 focus:outline-2"
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              />
              <span
              onClick={()=> setShowPassword((prev)=>!prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <PiEyeSlashFill fontSize={24} fill="#AFB2BF"/>
                ) : (
                  <PiEyeFill fontSize={24} fill="#AFB2BF"/>
                )}
              </span>
            </label>


            <label className="relative mt-[100px]">
              <p className="mt-7 mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm Password<sup className="text-pink-200">*</sup></p>
              <input
                className="orm-style  w-full p-3 h-10 border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square focus:border-0 focus:outline-2"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                required
                type={showConfirmPasswrod ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm password"
              />
              <span
              onClick={()=> setshowConfirmPasswrod((prev)=>!prev)}
              className="absolute right-3 top-[95px] z-[10] cursor-pointer"
              >
                {showConfirmPasswrod ? (
                  <PiEyeSlashFill fontSize={24} fill="#AFB2BF" />
                ) : (
                  <PiEyeFill fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <button type="submit"
            className="mt-10 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                Reset Password 
            </button>

            <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
              <BiArrowBack /> Back to Login</p>
            </Link>
          </div>


          </form>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
