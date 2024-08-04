import React from 'react'
import logo from "../../assets/Logo/Logo.svg"
import { Link } from 'react-router-dom';
import {FaFacebook, FaGoogle, FaTwitter, FaYoutube} from "react-icons/fa"
import { FooterLink2 } from '../../data/footer-links';

const CompanyPages = [
  "About",
  "Careers",
  "Affiliates",
];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Communities = ["Forums", "Chapters", "Events"];
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];


const Footer = () => {
  return (
    <div className=' bg-richblack-800'>
      <div className=' w-11/12 flex flex-row max-w-maxContent gap-12 items-center justify-between text-richblack-400 mx-auto relative py-[52px]'>
        <div className=' border-b flex flex-row pb-5 border-richblack-700 w-full'>
        {/* SECTION 1 */}
          <div className=' w-[50%] flex flex-row justify-between border-r border-richblack-700 gap-3'>

            {/* COLUMN 1 */}
            <div className=' flex flex-col gap-3 w-[30%]'>
              <img src={logo} alt="Study Notion Logo" className=' object-contain' />
              <h3 className=' font-medium text-base text-richblack-100'>Company</h3>
              <div className='flex flex-col gap-2'>
              {
                CompanyPages.map((page, index) => {
                  return (
                    <div 
                    className=' cursor-pointer text-sm font-normal text-richblack-400'
                    key={index}>
                      <Link to={page.toLowerCase()}>{page}</Link>
                    </div>
                  )
                })
              }
              </div>
              <div className=' flex flex-row gap-3'>
                <FaFacebook/>
                <FaGoogle/>
                <FaTwitter/>
                <FaYoutube/>
              </div>
            </div>

            {/* COLUMN 2 */}
            <div className=' flex flex-col w-[30%]'>
              <h3 className=' font-medium text-base text-richblack-100 mb-3'>Resources</h3>
              <div className=' flex flex-col gap-2 mt-2'>
                {
                  Resources.map((resource, index) => {
                    return (
                      <div 
                      key={index}
                      className=' cursor-pointer text-sm font-normal text-richblack-400'>
                        <Link to={resource.split(" ").join("-").toLowerCase()}>
                          {resource}
                        </Link>
                      </div>
                    )
                  })
                }
              </div>
              <div className=' flex flex-col gap-3 mt-9 '>
                <h3 className=' font-medium text-base text-richblack-100'>Support</h3>
                <div className=' text-sm font-normal text-richblack-400'>
                  <Link to={"/help-center"}>Help-Center</Link>
                </div>
              </div>
            </div>

            {/* COLUMN 3 */}
            <div className=' w-[30%] flex flex-col gap-9'>
                <div className=' flex flex-col gap-3'>
                  <h3 className=' font-medium text-base text-richblack-100'>Plans</h3>
                  <div className='flex flex-col gap-2'>
                    {
                      Plans.map((plan, index) => {
                        return (
                          <div 
                            key={index}
                            className='cursor-pointer text-sm font-normal text-richblack-400'
                          >
                            <Link to={plan.split(" ").join("-").toLowerCase()}>{plan}</Link>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>

                <div className=' flex flex-col gap-3'>
                    <h3 className=' font-medium text-base text-richblack-100'>Community</h3>
                    <div className='flex flex-col gap-2'>
                      {
                        Communities.map((community, index) => {
                          return (
                            <div
                              className='cursor-pointer text-sm font-normal text-richblack-400'
                              key={index}
                            >
                              <Link to={community.split(" ").join("-").toLowerCase()}>{community}</Link>
                            </div>
                          )
                        })
                      }
                    </div>
                </div>
            </div>
            
          </div>

          {/* SECTION 2 */}
          <div className=' w-[50%] flex flex-row flex-wrap gap-3 justify-between pl-12'>
            
            {/* PART 1 */}
              {
                FooterLink2.map((subject, index)=> {
                  return (
                    <div 
                    key={index}
                    className='w-[30%] flex flex-col gap-3'>
                      <h3 className="text-richblack-50 font-semibold text-[16px]">{subject.title}</h3>
                      <div className=' flex flex-col gap-2'>
                        {
                          subject.links.map((link, index) => {
                            return(
                              <div
                              key={index}
                              className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'
                              >
                                <Link to={link.link}>{link.title}</Link>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
          </div>
        </div>
      </div>

      <div className=' w-11/12 max-w-maxContent flex flex-row pb-14 text-sm justify-between items-center mx-auto text-richblack-400'>
        <div className=' flex flex-row justify-between items-start gap-3 w-full'>
          <div className='flex flex-row'>
            {
              BottomFooter.map((footerElemet, index) => {
                return (
                  <div
                  key={index}
                  className={`${
                    BottomFooter.length - 1 === index
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"} px-3`}
                  >
                    <Link to={footerElemet.split(" ").join("-").toLocaleLowerCase()}>{footerElemet}</Link>
                  </div>
                )
              })
            }
          </div>

          <div className=' text-center'>
            Made with ❤️ Palash Bag © {new Date().getFullYear()} Studynotion
          </div>
        </div>
      </div>


    </div>
  )
}

export default Footer
