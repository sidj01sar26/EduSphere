import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        logo: Logo1,
        title: "Leadership",
        desc: "Fully committed to the success company",
    },
    {
        logo: Logo2,
        title: "Responsibility",
        desc: "Students will always be our top priority",
    },
    {
        logo: Logo3,
        title: "Flexibility",
        desc: "The ability to switch is an important skills",
    },
    {
        logo: Logo4,
        title: "Solve the problem",
        desc: "Code your way to a solution",
    },
]

const TimelineSection = () => {
  return (
    <div>
      <div className='flex flex-row gap-14 items-center'>

        {/* 1ST BOX */}
        <div className=' w-[45%] flex flex-col gap-6'>
            {
                timeline.map((element, index) => {
                    return (
                       <div className='flex flex-row gap-6' key={index}>
                        <div className=' w-[52px] h-[52px] bg-white flex justify-center items-center p-1 shadow-[#00000012] shadow-[0_0_62px_0] rounded-full'>
                            <img src={element.logo} alt={element.title} />
                        </div>

                        <div className='flex flex-col'>
                            <h2 className=' text-[18px] font-semibold'>{element.title}</h2>
                            <p className=' text-[14px] font-normal'>{element.desc}</p>
                        </div>

                        <div className='hidden h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]'>
                        </div>

                       </div>
                    )
                })
            }
        </div>
        
        {/* image */}
        <div className='relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]'>

            <img 
                src={timelineImage} 
                className='shadow-white shadow-[20px_20px_0px_0px] object-cover h-fit'
                alt="timelineImage" />

            <div className=' absolute flex flex-row text-white bg-caribbeangreen-600 py-7 left-[50%] translate-x-[-50%] translate-y-[-50%] '>

            {/* BOX 1 */}
            <div className=' flex flex-row items-center gap-[15px] border-r border-caribbeangreen-300 px-14'>
                <h2 className=' text-4xl font-bold text-center tracking-[-0.72px]'>10</h2>
                <p className=' text-sm font-medium text-caribbeangreen-300 w-[75px]'>YEARS EXPERIENCES</p>
            </div>

            {/* BOX 2 */}
            <div className=' flex items-center gap-[15px]  px-14'>
                <h2 className=' text-4xl font-bold text-center tracking-[-0.72px]'>250</h2>
                <p className=' text-sm font-medium text-caribbeangreen-300 w-[75px]'>TYPES OF COURSES</p>
            </div>

            </div>

        </div>

      </div>
    </div>
  )
}

export default TimelineSection
