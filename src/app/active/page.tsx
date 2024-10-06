import React from 'react'
import Price from '../components/subscription/subscription'

const page = () => {
  return (
    <div>
    <h1 className="text-[24px] font-bold mt-[100px] p-5 text-center">
      Please Get Subscription
    </h1>
    <div className="container p-5">
      <Price />
    </div>
  </div>
  )
}

export default page