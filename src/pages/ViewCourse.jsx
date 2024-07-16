import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import ReviewModal from '../components/core/ViewCourse/ReviewModal';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { FaBars } from 'react-icons/fa'; // Import an icon from react-icons

const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(true); // State for sidebar visibility
    const { courseId } = useParams();
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecifics = async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));
            var lecture = 0;
            courseData?.courseDetails?.courseContent?.forEach((section) => {
                lecture += section?.subSection?.length;
            });
            dispatch(setTotalNoOfLectures(lecture));
        }
        setCourseSpecifics();
    }, [courseId, token, dispatch]);

    return (
        <div className='flex w-screen'>
            <div className=' top-0 left-0 z-40 bg-grey-1'>
                <button 
                    className='p-2 text-white'
                    onClick={() => setSidebarVisible(!sidebarVisible)}
                >
                    <FaBars size={24} color='white' className='cursor-pointer mt-4' />
                </button>
            </div>
            {sidebarVisible && (
                <div className='w-[30%]'>
                    <VideoDetailsSidebar setReviewModal={setReviewModal} />
                </div>
            )}
            <div className={`flex bg-black-1  items-center justify-center ${sidebarVisible ? 'w-[70%]' : 'w-full'}`}>
                <Outlet />
            </div>
            {reviewModal && <ReviewModal setReviewModal={setReviewModal} />}
        </div>
    )
}

export default ViewCourse;
