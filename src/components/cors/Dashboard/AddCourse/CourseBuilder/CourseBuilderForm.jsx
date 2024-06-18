import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBttn from '../../../../common/IconBttn';
import { FiPlusSquare } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineNavigateNext } from "react-icons/md";
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
// import { createSection, updateSection } from '../../../../../../server/controllers/Section';
import NestedView from './NestedView';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';



const CourseBuilderForm = () => {
    const {register, handleSubmit, setValue, formState:{errors}} = useForm();
    const [editSectionName, setEditSectionName] = useState(null);
    const {course} = useSelector((state)=>state.course);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    const onSubmit =  async (data)=>{
        setLoading(true);
        let result;

        if(editSectionName){
            //we are editing the section anme
            result = await updateSection({
                sectionName: data.sectionName,
                sectionId: editSectionName,
                courseId: course._id,
            }, token)
        }
        else{
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id,
            }, token)
        }

        //update values
        if(result){
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "");
        }
        //loading false
        setLoading(false);
    }

    const cancelEdit=()=>{
        setEditSectionName(null);
        setValue("sectionName", "");
    }

    const goBack = ()=>{
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const goToNext = ()=>{
        if(course.courseContent.length === 0){
            toast.error("Please add atleast one Seciton");
            return;
        }
        if(course.courseContent.some((section)=>section.subSubsection.length === 0)){
            toast.error("Please add atleast one lecture in each section");
            return;
        }
        //if everythin is good go to next step
        dispatch(setStep(3));
    }

    const handleChangeEditSectionName = (sectionId, sectionName)=>{
        if(editSectionName === sectionId){
            cancelEdit();
            return;
        }

        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }
  return (
    <div className='text-white'>
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor='sectionName'>Section name <sup>*</sup></label>
            <input
            id='sectionName'
            placeholder='Add section name'
            {...register("sectionName", {required:true})}
            className='w-full'
            />
            {errors.sectionName && (
                <span>Section Name is required</span>
            )}
        </div>
        <div className='mt-10 flex items-center'>
            <IconBttn
            type="Submit"
            customClassses={'text-white'}
            text={editSectionName ? "Edit Section Name":"Create Section"}
            outline={true}
            >
                <FiPlusSquare className='text-yellow-50'/>
            </IconBttn>
            {editSectionName && (
                <button
                type='button'
                onClick={cancelEdit}
                className='text-sm text-richblack-300 underline'>
                    Cancel Edit
                </button>
            )}
        </div>
      </form>

      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
      )}

      <div className='flex justify-end gap-x-3'>
        <button
        onclick={goBack}
        className='rounded-md cursor-pointer flex items-center'>
            Back
        </button>
        <IconBttn
        text="Next"
        onclick={goToNext}>
            <MdOutlineNavigateNext />
        </IconBttn>
      </div>



    </div>
  )
}

export default CourseBuilderForm
