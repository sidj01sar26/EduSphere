import React from 'react'
import IconButton from '../../common/IconButton'
import {AiOutlinePlusCircle} from "react-icons/ai"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchInstructorCourses } from '../../../services/operation/courseDetailsAPI'
import { useState } from 'react'
import CourseTable from './InstructorCourses/CourseTable'

const MyCourses = () => {

    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await fetchInstructorCourses(token)
            if(result){
                setCourses(result)
            }
        }
        fetchCourses();
        // eslint-disable-next-line
    },[])

  return (
    <div>
      <div className='flex items-center justify-between mb-14'>
        <h2 className=' text-3xl font-medium text-richblack-5'>My Courses</h2>
        <IconButton 
            text="New"
            onclick={() => navigate("/dashboard/add-course") }
        > <AiOutlinePlusCircle/> </IconButton>
      </div>
      {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}

export default MyCourses
