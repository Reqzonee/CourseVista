import React from 'react'

const IconBttn = ({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    customClassses,
    type,
}) => {
  return (
    <button
    disabled={disabled}
    onClick={onclick}
    type={type}
    className={`flex items-center ${
        outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClassses}`}
>
        {
            children?(
            <>
                <span>
                    {text}
                </span>
                {children}
            </>
            ):(text)
        }
    </button>
  )
}

export default IconBttn
