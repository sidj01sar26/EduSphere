import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import Stats from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

const About = () => {
  return (
    <div>
        {/* SECTION 1 */}
        <section className=' bg-richblack-700'>
            <div className=' relative w-11/12 max-w-maxContent flex flex-col mx-auto justify-between text-center gap-12 text-richblack-5'>
                <header className='lg:w-[70%] flex flex-col mx-auto text-4xl font-semibold pt-20'>
                    Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"} />
                    <p className=' lg:w-[95%] mt-4 text-base font-medium text-center text-richblack-300'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </header>

                <div className='sm:h-[70px] lg:h-[150px] mt-12'></div>
                <div className=' absolute grid grid-cols-3 w-[100%] gap-3 lg:gap-5 bottom-0 left-[50%] translate-x-[-50%] translate-y-[30%]  '>
                    <img src={BannerImage1} alt="" />
                    <img src={BannerImage2} alt="" />
                    <img src={BannerImage3} alt="" />
                </div>
            </div>
        </section> 

        {/* SECTION 2 */}
        <section className=' border-b border-richblack-700'>
            <div className='w-11/12 max-w-maxContent flex flex-col mx-auto justify-between gap-10 text-richblack-500'>
            <div className="h-[100px] "></div>
                <Quote/>
            </div>
        </section>

        {/* SECTION 3 */}
        <section>
            <div className=' w-11/12 max-w-maxContent flex flex-col mx-auto justify-between text-richblack-500 '>
            {/* TOP BOX (TEXT & IMAGE) */}
                <div className='flex flex-col lg:flex-row items-center justify-between gap-10'>
                    {/* LEFT BOX */}
                    <div className=' my-24 lg:w-[50%] flex flex-col gap-10' >
                        <h3 className='lg:w-[70%] bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl text-transparent font-semibold'>Our Founding Story </h3>

                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    {/* RIGHT BOX */}
                    <div>
                        <img 
                            src={FoundingStory} 
                            alt="" 
                            className='shadow-[0_0_20px_0] shadow-[#FC6767]'
                            />
                    </div>
                </div>
            {/* BOTTOM BOX (2 TEXT) */}
                <div className='flex flex-col items-center lg:gap-10 lg:flex-row justify-between'>
                    {/* LEFT BOX */}
                    <div className=' lg:w-[40%] flex flex-col my-24 gap-10'>
                        <h3 className='bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]'>Our Vision</h3>
                        <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>

                    {/* RIGHT BOX */}
                    <div className=' lg:w-[40%] flex flex-col my-24 gap-10'>
                        <h3 className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%]'>Our Mission</h3>
                        <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 4 */}
        <section>
            <Stats/>
        </section>

        {/* SECTION 5 */}
        <section className=' w-11/12 max-w-maxContent flex flex-col mx-auto justify-between mt-20 text-white gap-10'>
           <LearningGrid />
           <ContactFormSection/> 
        </section>

        {/* SECTION 6 */}
        <section>
            <ReviewSlider/>
        </section>

        <Footer/>
    </div>
  )
}

export default About
