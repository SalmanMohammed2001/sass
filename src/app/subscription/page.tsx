import Link from 'next/link'
import React from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'






export const metadata={
  title:"Confirm Email Page",
  description:"Check your email"
  
}








const Subscriptionpage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold text-gray-800">Check your email!</h1>
      <p className="mt-4 text-gray-600">
        We have sent a confirmation email to your inbox. Please check your email and click the confirmation link to proceed.
      </p>
      <div className="mt-6 ">
      <Link href={'/'} className='flex items-center justify-center'>      <FaRegArrowAltCircleLeft className='w-[45px] h-[45px]' /></Link>
      </div>
    </div>
  </div>
  )
}

export default Subscriptionpage