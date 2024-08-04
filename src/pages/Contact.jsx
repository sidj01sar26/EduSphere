import React from 'react'
import ContactDetails from '../components/core/ContactPage/ContactDetails'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'

const Contact = () => {
  return (
    <div>
      <div className=' w-11/12 max-w-maxContent flex lg:flex-row flex-col mx-auto justify-between my-20 text-white gap-10'>
        {/* CONTACT DETAILS */}
        <div className='lg:w-[40%]'>
            <ContactDetails/>
        </div>

        {/* CONTACT FORM */}
        <div className='lg:w-[60%]'>
            <ContactFormSection/>
        </div>
      </div>
    </div>
  )
}

export default Contact
