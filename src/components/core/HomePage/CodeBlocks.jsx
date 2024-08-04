import React from 'react'
import {FaArrowRight} from 'react-icons/fa'
import CTAButton from "../HomePage/Button"
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({
    position,
    heading,
    subheading,
    ctabtn1,
    ctabtn2,
    codeblock,
    backgroundGradient,
    codeColor
}) => {

  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>

        {/* SECTION 1 */}
        <div className='w-[50%] flex flex-col gap-[12px]'>
            <div className=' text-4xl font-bold'>
                {heading}
            </div>

            <div className=' text-richblack-300 text-base font-medium'>
                {subheading}
            </div>

            <div className=' flex gap-[24px] pt-12'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/* SECTION 2 */}
        <div className=' relative h-fit flex flex-row text-[10px] w-[100%] lg:w-[500px] py-4'>
        
            {backgroundGradient}

            <div className=' text-center flex flex-col w-[10%]'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={` w-[90%] flex flex-col gap-2 font-semibold ${codeColor} font-semibold font-mono` }>
                <TypeAnimation
                   sequence={[codeblock, 5000, ""]} 
                   repeat={Infinity}
                   cursor={true}
                   omitDeletionAnimation={true}
                   style={{display:"block", whiteSpace:"pre-line"}}
                />
            </div>

        </div>

    </div>
  )
}

export default CodeBlocks
