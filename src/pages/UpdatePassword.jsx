import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { Link, useLocation } from "react-router-dom";
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
    <div>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div className="text-white"> 
          <h1>Chosse new password</h1>
          <p>Atmost done. Enter your new password and you are all set</p>
          <form onSubmit={handleOnSubmit}>
            <label>
              <p>New Password*</p>
              <input
              className="w-full p-6 bg-richblack-600 text-richblack-5"
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="password"
              />
              <span
              onClick={()=> setShowPassword((prev)=>!prev)}
              >
                {showPassword ? (
                  <PiEyeSlashFill fontSize={24} />
                ) : (
                  <PiEyeFill fontSize={24} />
                )}
              </span>
            </label>


            <label>
              <p>Confirm Password*</p>
              <input
                className="w-full p-6 bg-richblack-600 text-richblack-5"
                required
                type={showConfirmPasswrod ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm password"
              />
              <span
              onClick={()=> setshowConfirmPasswrod((prev)=>!prev)}
              >
                {showConfirmPasswrod ? (
                  <PiEyeSlashFill fontSize={24} />
                ) : (
                  <PiEyeFill fontSize={24} />
                )}
              </span>
            </label>

            <button type="submit">
                Reset Password 
            </button>

            <div>
            <Link to="/login">
              <p>Back to Login</p>
            </Link>
          </div>


          </form>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
