import React from 'react'
import ContactUsForm from '../../common/ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto flex flex-col items-center'>
      <h1 className='text-center text-4xl font-semibold'>
        Get in Touch
      </h1>
      <p className='text-center text-richblack-300 mt-3 mb-6 ml-2'>
        We'd love to here for you, Please fill out this form.
      </p>
      <div className='ml-4'>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
