import React from 'react'
import {HiUsers} from "react-icons/hi"
import {ImTree} from "react-icons/im"

const CourseCards = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div 
        className={ `w-[30%] text-richblack-25 box-border cursor-pointer 
                    ${currentCard === cardData?.heading ? 
                    " bg-richblack-5 shadow-[12px_12px_0_0] shadow-yellow-50" :
                    " bg-richblack-700"}`}
        onClick={() => setCurrentCard(cardData?.heading)}
    >
      {/* PART 1 */}
      <div className=' flex flex-col gap-3 px-6 pt-8 pb-12 h-[80%] border-b-[2px] border-richblack-400 border-dashed '>
        {/* TITLE */}
        <h3 className={` ${currentCard === cardData?.heading && " text-richblack-800 text-xl font-semibold"} `}> {cardData?.heading} </h3>
        {/* DESCRIPTION */}
        <p className=' text-richblack-400 text-base font-normal'> {cardData?.description} </p>
      </div>

      {/* PART 2 */}
      <div className={` flex flex-row justify-between gap-4 py-4 px-6 font-medium 
                      ${currentCard === cardData?.heading ? 
                      " text-blue-400" : 
                      " text-richblack-400" } `}
      >
          <div className=' flex gap-2 items-center text-base'>
            <HiUsers/>
            <p> {cardData?.level} </p>
          </div>
          <div className=' flex gap-2 items-center text-base'>
            <ImTree/>
            <p> {cardData?.lessionNumber} Lessions </p>
          </div>
      </div>

    </div>
  )
}

export default CourseCards
