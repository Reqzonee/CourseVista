import React from 'react'

const IconBttn = ({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    customeClassses,
    type,
}) => {
  return (
    <button
    disabled={disabled}
    onClick={onclick}
    type={type}>
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
