import React from 'react'
import { Outlet } from 'react-router';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';

import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import ReviewModal from '../components/cors/ViewCourse/CourseReviewModal';
import VideoDetailsSidebar from '../components/cors/ViewCourse/VideoDetailsSidebar';

const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState(false)
    const {courseId} = useParams();
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecifics = async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData( courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));
            var lecture = 0;
            console.log("coursedata ", courseData);
            courseData?.courseDetails?.courseContent?.forEach((section) => {
                lecture += section?.subSection?.length;
            });
            dispatch(setTotalNoOfLectures(lecture));
        }
        setCourseSpecifics();
    }, [courseId, token, dispatch]);

  return (
    
    <div className=' flex w-screen'>
        <div className=''>
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>
        <div>
            <Outlet/>
        </div>
        {
            reviewModal && <ReviewModal setReviewModal={setReviewModal} />
        }
    </div>
  )
}

export default ViewCourse