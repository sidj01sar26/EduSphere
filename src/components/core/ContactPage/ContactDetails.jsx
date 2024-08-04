import React from 'react'
import * as Icon1 from "react-icons/hi2"
import * as Icon2 from "react-icons/bi"
import * as Icon3 from "react-icons/io5"

const contactDetails = [
    {
      icon: "HiChatBubbleLeftRight",
      heading: "Chat on us",
      description: "Our friendly team is here to help.",
      details: "info@studynotion.com",
    },
    {
      icon: "BiWorld",
      heading: "Visit us",
      description: "Come and say hello at our office HQ.",
      details: "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
      icon: "IoCall",
      heading: "Call us",
      description: "Mon - Fri From 8am to 5pm",
      details: "+123 456 7869",
    },
  ]


const ContactDetails = () => {
  return (
    <div className=' flex flex-col lg:p-6 gap-6 rounded-xl bg-richblack-800'>
      {
        contactDetails.map((contactInfo, index) => {
            let Icon = Icon1[contactInfo.icon] || Icon2[contactInfo.icon] || Icon3[contactInfo.icon]
            return (
                <div
                    key={index}
                    className=' flex flex-col gap-1 text-richblack-200 p-3 text-sm'
                >
                    <div className=' flex flex-row items-start gap-2'>
                        <div>
                            <Icon size={25}/>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-richblack-5"> {contactInfo.heading} </h3>
                            <p className="font-medium"> {contactInfo.description} </p>
                            <p className=" font-semibold"> {contactInfo.details} </p>
                        </div>
                    </div>
                    
                </div>
            )
        })
      }
    </div>
  )
}

export default ContactDetails
