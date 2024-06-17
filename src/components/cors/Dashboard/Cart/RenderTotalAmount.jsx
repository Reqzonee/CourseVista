import React from 'react'
import IconBttn from '../../../common/IconBttn'
import { useSelector } from 'react-redux'

const RenderTotalAmount = () => {
    const {total, cart} = useSelector((state)=>state.cart)

    const handleBuyCourse=()=>{
        const courses = cart.map((course) => course._id);
        console.log("Bought these course:", courses);
        //TODO: API integrate -> payment gateway tak leke jaegi
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
