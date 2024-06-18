import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories, fetchCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi2';
import { categories } from '../../../../../services/apis';
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import IconBttn from '../../../../common/IconBttn';
import { COURSE_STATUS } from '../../../../../utils/constants';
import toast from 'react-hot-toast';

const CourseInfromationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm();

    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const {course, step, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() =>{
        // console.log("formData ", formData);
        const getCategories = async()=>{
            setLoading(true);
            const categories = await fetchCourseCategories();
            console.log(categories);
            console.log("Category length is ", categories.length);
            if(categories.length > 0){
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        if(editCourse){
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            // setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            // setValue("courseRequirements", course.instructions);
            // setValue("courseImage", course.thumbnail);
        }

        getCategories();
    },[])

    const isFormUpdated = ()=>{
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            // currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category 
            // currentValues.courseRequirements.toString() !== course.instructions.toString() 
            // currentValues.courseImage !== course.thumbnail ||
        ){
            console.log("isFromupadata is printing true");
            return true;
        }
        else {
            console.log("isFromupadata is printing false");
            return false;
        }
    }

    const onSubmit = async(data) =>{
        if(editCourse){
            if(isFormUpdated){
                const currentValues = getValues();
                const formData = new FormData();
                formData.append("courseId", course._id);
                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName", data.courseTitle);
                }

                if(currentValues.courseShortDesc !== course.courseDescription){
                    formData.append("courseDescription", data.courseShortDesc);
                }

                if(currentValues.coursePrice !== course.price){
                    formData.append("price", data.coursePrice);
                }

                if(currentValues.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }

                if(currentValues.courseCategory._id !== course.category){
                    formData.append("category", data.courseCategory);
                }

                // if(currentValues.courseTitle !== course.courseName){
                //     formData.append("courseName", data.courseTitle);
                // }
                if(currentValues.courseRequirements.toString() !== course.instructions.toString() ){
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }
                
                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if(result){
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            }
            else{
                toast.error("No Changes made to the form");
            }
            console.log("Printing Formdata", formData);
            console.log("Printing result", result);
            return;
        }

        //create a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        // formData.append("instructions", data.JSON.stringify(data.courseRequirements));
        // formData.append("courseName", data.courseTitle);
        // formData.append("courseName", data.courseTitle);
        formData.append("status", COURSE_STATUS.DRAFT);
        console.log("formData is ", formData);


        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if(result){
            console.log("I am inside result");
            dispatch(setStep(2));
            console.log("step ", step);
            dispatch(setCourse(result));
        }
        setLoading(false);
        console.log("Printing Formdata", formData);
        console.log("Printing result", result);

    }
  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>
        <div className='text-white'>
            <label
            htmlFor = 'courseTitle'>Course Title<sup>*</sup></label>
            <input 
               id='courseTitle'
               placeholder='Enter Course Title'
               {...register("courseTitle", {required:true})}
               className='w-full'
            />
            {
                errors.courseTitle && (
                    <span>Course Title is Required**</span>
                )
            }
        </div>

        <div>
            <label
            htmlFor = 'courseShortDesc'>Course Short Description</label>
            <textarea
            id='courseShortDesc'
            placeholder='Enter Description'
            {...register("courseShortDesc", {required:true})}
            className='min-h-[140px] w-full'
            />
            {
                errors.courseShortDesc && (<span>
                    Course Description is required**
                </span>)
            }
        </div>

        <div className='text-white relative'>
            <label
            htmlFor = 'coursePrice'>Course Price<sup>*</sup></label>
            <input 
               id='coursePrice'
               placeholder='Enter Course Price'
               {...register("coursePrice", {
                required:true,
                valueAsNumber:true
            })}
               className='w-full'
            />
            <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400'/>
            {
                errors.coursePrice && (
                    <span>Course Price is Required**</span>
                )
            }
        </div>

        <div>
            <label 
            htmlFor = 'courseCategory'>Course Category<sup>*</sup></label>
            <select
            id='courseCategory'
            defaultValue=""
            {...register('courseCategory', {required:true})}
            >
                <option value="" disabled>Chosse a Category</option>
                {
                    !loading && courseCategories.map((category, index) =>(
                        <option key={index} value={category?._id}>
                            {category?.name}
                        </option>
                    ))
                }
            </select>
            {
                errors.courseCategory && (
                    <span>
                        Course Category is required
                    </span>
                )
            }

        </div>

        {/* //create a custom component for handeling tags  */}
        {/* <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        /> */}

        {/* create a component for uploading and showing preview of media  */}
        {/* <Upload
        name=
        label=
        register={}
        errors=
        setValue={}/> */}

        {/* Benefits of the Course  */}
        <div>
            <label>benefits of the course<sup>*</sup></label>
            <textarea
            id='coursebenefits'
            placeholder='Enter Benefits of the course'
            {...register("courseBenefits", {required:true})}
            className='min-h-[130px] w-full'/>
            {errors.courseBenefits &&(
                <span>
                    Benefits of the course are required
                </span>
            )}
        </div>

        <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        />

        <div>
            {
                editCourse && (
                    <button 
                    onClick={()=>dispatch(setStep(2))}
                    className='flex items-center gap-x-2 bg-richblack-300'>
                        Continue Without Saving
                    </button>
                )
            }
            

            <IconBttn
            
            text={!editCourse ? "Next":"Save Changes"}
            />
        </div>

    </form>
  )
}

export default CourseInfromationForm
