import React, { useEffect, useState } from 'react'

const RequirementField = ({name, label, register, errors, setValue, getValues}) => {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(()=> {
        register(name, {
            required:true,
            validate: (value)=> value.length > 0
        })
    },[])

    useEffect(()=>{
        setValue(name, requirementList);
    },[requirementList])

    const handleAddRequirement = ()=>{
        if(requirement){
            setRequirement([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement =(index)=>{
        const updatedRequirementList = [...requirementList]
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }
  return (
    <div>
      <label htmlFor={name}>{label}<sup>*</sup></label>
      <div>
        <input
        type='text'
        id={name}
        value={requirement}
        onChange={(e)=>setRequirement(e.target.value)}
        className='w-full'
        />
        <button
        type='button'
        onClick={handleAddRequirement}
        className='font-semibold text-yellow-50'>
            Add
        </button>
      </div>

      {
        requirementList.length > 0 && (
            <ul>
                {
                    requirementList.map((requirement, index)=>(
                        <li key={index} className='flex items-center'>
                            <span>{requirement}</span>
                            <button 
                            type='button'
                            className='text-xs text-pure-greys-300'
                            onClick={() => handleRemoveRequirement(index)}>
                                clear
                            </button>
                        </li>
                    ))
                }
                {errors[name] && (
                    <span>
                        {label} is required
                    </span>
                )}
            </ul>
        )
      }
    </div>
  )
}

export default RequirementField
