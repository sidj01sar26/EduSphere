import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconButton from '../../common/IconButton'
import {BsChevronDown} from "react-icons/bs"

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("")
    const [videoBarActive, setVideoBarActive] = useState("")
    const {sectionId, subSectionId} = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse)

    useEffect(() => {
      ;(() => {
        // check if there no course section data
        if(!courseSectionData.length) return
        // find out current section index
        const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
        // find out current sub section index
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId)
        // find out current active videoId
        const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id 
        // set current section
        setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
        // set current sub section
        setVideoBarActive(activeSubSectionId)
      })()
      // eslint-disable-next-line
    }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        {/* buttons back and review */}
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          {/* Back Buttons */}
          <div className="flex w-full items-center justify-between ">
            <div 
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
            onClick={() => {
                navigate("/dashboard/enrolled-courses")
            }}>Back</div>
            {/* Add review button */}
            <div>
              <IconButton
                text="Add Review"
                customClasses="ml-auto"
                onclick={() => setReviewModal(true)}
              />
            </div>
          </div>

          {/* Heading */}
          <div className="flex flex-col">
            <p> {courseEntireData?.courseName} </p>
            <p className="text-sm font-semibold text-richblack-500"> {completedLectures?.length} / {totalNoOfLectures} </p>
          </div>
        </div>
          {/* For sections and Subsections */}
          <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
            {courseSectionData.map((section, index) => (
                <div
                className="mt-2 cursor-pointer text-sm text-richblack-5"
                key={index}
                onclick={() => setActiveStatus(section?._id)}>

                  {/* Section */}
                  <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                    {/* Section Name */}
                    <div className="w-[70%] font-semibold">
                        {section?.sectionName}
                    </div>
                    {/* Arrow icon */}
                    <div className="flex items-center gap-3">
                        <span
                        className={`${activeStatus === section?.sectionName ? " rotate-0" : " rotate-180"} transition-all duration-500`}>
                            <BsChevronDown />
                        </span>
                    </div>
                  </div>

                  {/* SUbsection */}
                  <div>
                  {/* Make Condition-> show sub section for active section */}
                    {activeStatus === section?._id && (
                        <div className="transition-[height] duration-500 ease-in-out">
                          {section.subSection.map((topic, index) => (
                            <div
                            className={`${videoBarActive === topic._id ? " bg-yellow-200 text-richblack-900" : " bg-richblack-700 text-richblack-25"}`}
                            onClick={() => {
                                navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                setVideoBarActive(topic._id)
                            }}
                            key={index}>
                              <input
                              type='checkbox'
                              checked={completedLectures.includes(topic?._id)}
                              onChange={() => {}}
                              />
                              <span>
                                {topic.title}
                              </span>
                            </div>
                          ))}  
                        </div>
                    )}
                  </div>
                </div>
            ))}
          </div>
      </div>
    </>
  )
}

export default VideoDetailsSidebar
