import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Rendersteps from "../AddCourse/Rendersteps";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";

export default function EditCourse() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(()=>{
    const populateCourseDetails = async()=>{
        setLoading(true);
        const result = await getFullDetailsOfCourse(courseId, token);
        if(result?.courseDetails){
            dispatch(setEditCourse(true));
            dispatch(setCourse(result?.courseDetails));
        }
        setLoading(false);
    }
    populateCourseDetails();
  },[])

  if(loading){
    return (
        <div>
            Loading....
        </div>
    )
  }

  return (
    <div>
      <h1>Edit Course</h1>
      <div>
        {
            course ? (<Rendersteps/>)
            :(<p>Course Not Found</p>)
        }
      </div>
    </div>
  );
}
