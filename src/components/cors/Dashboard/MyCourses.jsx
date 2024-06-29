import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBttn from '../../common/IconBttn';
import CoursesTable from './InstructorCourses/CoursesTable';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';

const MyCourses = () => {

    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(()=>{
        const fetchCourses = async()=>{
            const result = await fetchInstructorCourses(token);
            if(result){
                 setCourses(result);
            }
        }
        fetchCourses();
    }, [])
  return (
    <div>
      <div>
        <h1>My Courses</h1>
        <IconBttn
        text="Add Course"
        onclick={()=>navigate("/dashboard/add-course")}
        // ADd icon 
        />
      </div>

      {courses && <CoursesTable courses={courses} setCourses={setCourses}/>}
    </div>
  )
}

export default MyCourses
