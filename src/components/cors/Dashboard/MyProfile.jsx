import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBttn from '../../common/IconBttn';

const MyProfile = () => {
    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();

  return (
    <div className='text-white flex flex-col'>
      <h1>
        My Profile 
      </h1>

      {/* Section 1 */}
      <div>
        <div>
            <img src={user?.image}
            alt={`profile-${user?.fristname}`}
            className='aspect-square w-[78px] rounded full object-cover'/>
            <div>
                <p>{user?.fristname + " " + user?.lastname}</p>
                <p>{user?.email}</p>
            </div>
        </div>
        <IconBttn
        text="Edit"
        onclick={() => {
            navigate("/dashboard/settings")
        }}/>
      </div>

      {/* Section 2 */}
      <div>
        <div>
            <p>About</p>
            <IconBttn
            text="Edit"
            onclick={()=>{
                navigate("/dashboard/settings")
            }}/>
        </div>
        <p>{user?.additionalDetails?.about ?? "Write Something about your Self"}</p>
      </div>

      {/* Section 3 */}
      <div>
        <div>
            <p>Personal Details</p>
            <IconBttn
            text="Edit"
            onclick={()=>{
                navigate("/dashboard/settings")
            }}/>
        </div>

        <div>
            <div>
                <p>First Name </p>
                <p>{user?.fristname}</p>
            </div>
            <div>
                <p>Email </p>
                <p>{user?.email}</p>
            </div>
            <div>
                <p>Gender </p>
                <p>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
            </div>
            <div>
                <p>Last Name </p>
                <p>{user?.lastname}</p>
            </div>
            <div>
                <p>Phone Number </p>
                <p>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
            </div>
            <div>
                <p>Date of Birth</p>
                <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
            </div>
        </div>

      </div>
    </div>
  )
}

export default MyProfile
