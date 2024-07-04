import React from 'react'
import IconBttn from '../../../common/IconBttn'
import { useDispatch, useSelector } from 'react-redux'
import { buyCourse } from '../../../../services/operations/studentFeaturesApi'
import { useNavigate } from 'react-router-dom'

const RenderTotalAmount = () => {
    const {total, cart} = useSelector((state)=>state.cart)
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse=()=>{
        const courses = cart.map((course) => course._id);
        console.log("Bought these course:", courses);
        //TODO: API integrate -> payment gateway tak leke jaegi
        buyCourse(token, courses, user, navigate, dispatch);
    }
  return (
    <div>
      <p>Total:</p>
      <p>Rs {total}</p>
      <IconBttn
      text={"Buy Now"}
      onclick={handleBuyCourse}
      customeClassses={"w-full justify-center"}/>
    </div>
  )
}

export default RenderTotalAmount
