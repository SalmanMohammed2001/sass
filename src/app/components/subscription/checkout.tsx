"use client"

import { ckeckout } from '@/app/lib/action/stripe';
import { getUser } from '@/app/login/users'
import { loadStripe } from '@stripe/stripe-js';





import { useRouter } from 'next/navigation';

import React, { useState } from 'react'




const Checkout =  ({priceId}:{priceId:string}) => {

    const router = useRouter();


    const [setLoading] =useState(false)

  
   const fetchBlogs = async () => {
   

            const user= await  getUser()
      
            if(user== null){
             
             router.push('/login')
          
           
            }else{
           
                
                
  
    const data=JSON.parse(  await ckeckout(user.email!,priceId,location.origin + location.pathname))



        


       const stripe=  await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!)
         const res= await    stripe?.redirectToCheckout({sessionId:data.id})


                if(res?.error){ // Expecting a possible null value from findSubscription
                    // @ts-expect-error: findSubscription may return null, which we handle in the subsequent logic
                    setLoading(false)
                    alert("Fail to checkout")
                }

 // Expecting a possible null value from findSubscription
             // @ts-expect-error: findSubscription may return null, which we handle in the subsequent logic
                setLoading(false)
            }
            
           
         };
    const handleCheckout =()=>{
        
        fetchBlogs()
     
    }
  
    return <button className='py-[10px] px-[18px] text-white text-sm rounded-md cursor-pointer bg-[#0AA195] '  onClick={handleCheckout}>Get Subscription  </button>

}

export default Checkout