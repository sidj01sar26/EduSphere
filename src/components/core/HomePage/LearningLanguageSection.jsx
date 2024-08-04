import React from 'react'
import HighlightText from './HighlightText'

import progressImage from "../../../assets/Images/Know_your_progress.png"
import compareImage from "../../../assets/Images/Compare_with_others.png"
import lessonImage from "../../../assets/Images/Plan_your_lessons.png"

import CTAButton from '../HomePage/Button'



const LearningLanguageSection = () => {
  return (
    <div>
      <div className=' flex flex-col items-center gap-14'>

        {/* Part 1 */}
        <div className=' flex gap-3 flex-col px-[220px] items-center mt-[120px]'>
            <h3 className=' text-4xl font-semibold text-center text-richblack-900'>Your swiss knife for <HighlightText text={"learning any language"}/> </h3>
            <p className=' text-base font-medium text-richblack-500 text-center'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
        </div>

        {/* Part 2 */}
        <div className=' flex flex-row items-center justify-center'>
            <img 
                src={progressImage} 
                alt="" 
                className=' object-contain -mr-32'
            />
            <img 
                src={compareImage} 
                alt="" 
                className=' object-contain -mr-32'
            />
            <img 
                src={lessonImage} 
                alt="" 
            />
        </div>

        {/* Part 3 */}
        <div className=' flex justify-center items-start'>
            <CTAButton active={true} linkto={"/signup"} >
                Learn More
            </CTAButton>
        </div>

      </div>
    </div>
  )
}

export default LearningLanguageSection
