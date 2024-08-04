import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCards from './CourseCards';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);

    const setCardsData = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((courses) => courses.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div>
    {/* HEADING SECTION */}
      <div className=' flex flex-col items-center gap-2 my-10'>
        <h3 className='text-4xl font-semibold'>
            Unlock the <HighlightText text={"Power of Code"} />
        </h3>
        <p className=' text-sm text-richblack-500 font-medium'>
            Learn to Build Anything You Can Imagine
        </p>
      </div>

    {/* TAB SECTION */}
    <div className=' flex w-max mx-auto gap-5 bg-richblack-700 p-1 text-richblack-300 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] mb-6'>
        {
            tabsName.map((tabData, index) => {
                return(
                    <div className={` flex flex-row items-center px-7 py-2 rounded-full cursor-pointer transition-all duration-200 hover:bg-richblack-900 hover:text-richblack-5 ${
                        currentTab === tabData
                         ? " bg-richblack-900 text-richblack-5 font-medium "
                        : "text-richblack-300"}`}
                        key={index}
                        onClick={() => setCardsData(tabData)}
                        >
                        {tabData}
                    </div>
                )
            })
        }
    </div>

    <div className='lg:h-[150px]'></div>

    {/* CARD SECTION */}
    <div className=' absolute flex flex-row bottom-[0] left-[50%] gap-0 justify-between w-full translate-x-[-50%] translate-y-[50%] text-black'>
        {
            courses.map((courseData,index) => {
                return (
                   <CourseCards
                    cardData = {courseData}
                    currentCard = {currentCard}
                    setCurrentCard = {setCurrentCard}
                    key = {index}
                   /> 
                )
            })
        }
    </div>


    </div>
  )
}

export default ExploreMore
