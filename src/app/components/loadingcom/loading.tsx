import Image from 'next/image'
import React from 'react'

const LoadingCom = () => {
  return (
    <div className='flex items-center   h-[100vh] justify-center -z-50'>
        <Image src={"/loading.gif"} alt='loading' width={100} height={250}/>

    </div>
  )
}

export default LoadingCom