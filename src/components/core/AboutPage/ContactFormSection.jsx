import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">

      <h3 className="text-center text-4xl font-semibold">Get in Touch</h3>
      <p className="text-center text-richblack-300 mt-3">We’d love to here for you, Please fill out this form.</p>
      <div className="p-8 mx-auto">
        <ContactUsForm/>
      </div>

    </div>
  )
}

export default ContactFormSection
