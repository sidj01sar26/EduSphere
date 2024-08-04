import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import RenderAddCoursesteps from "../AddCourse/RenderAddCourseSteps"
import { useEffect } from "react"
import { getFullDetailsOfCourse } from "../../../../services/operation/courseDetailsAPI"
import { setCourse, setEditCouse } from "../../../../slices/courseSlice"


export default function EditCourse () {

    const dispatch = useDispatch()
    const {courseId} = useParams()
    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const populateCourseDetails = async() => {
            setLoading(true)
            const result = await getFullDetailsOfCourse(courseId, token);
            if(result?.courseDetails){
                dispatch(setEditCouse(true))
                dispatch(setCourse(result?.courseDetails))
            }
            setLoading(false)
        }
        populateCourseDetails();
        // eslint-disable-next-line
    },[])

    if(loading) {
        return(
            <div className="grid flex-1 place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return(
        <div>
            <h3 className="mb-14 text-3xl font-medium text-richblack-5">Edit Course</h3>
            <div className="mx-auto max-w-[600px]">
                {
                    course ? (<RenderAddCoursesteps/>) : (<p className="mt-14 text-center text-3xl font-semibold text-richblack-100">Course not Found</p>)
                }
            </div>
        </div>
    )
}