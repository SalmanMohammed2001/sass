
"use client"

import { manageBilling } from "@/app/lib/action/stripe";

import { useEffect, useState, useTransition } from "react"

import { createClient } from "@/app/lib/supabase/client";


const SubscriptionDetails = ({email}:any) => {

    const[data,setdata]=useState<any>([])
    const [, startTransition] = useTransition();


    
    
    
    
     async function findSubscription(email:string){
        const supabase = createClient();

        const { data, error } = await supabase
        .from("subscriptionData")
        .select('*')
        .eq('email', email);
       
        if(data){
            return data;
        }
        console.log(error);
        
    
    }
    
    
    
    
    
    
    
    const userDeetails=()=>{

            startTransition(async()=>{
             const data=   await  findSubscription(email)
             setdata(data)
            })

    }






    useEffect(()=>{
      
        

   userDeetails();

    },[])



    const handleBiling= async()=>{

        
      
         await Promise.all(
            data.map(async (value: any) => {
                const data = JSON.parse( await manageBilling(value.customer_id))
                    window.location.href=data.url
            })
        );

       

    }




  return (


    <div className=" mt-5 p-5">

       {
        data.map((data:any)=>{

            console.log(data.customer_id);
            
         
        
            return(
                <div key={data.email} className="pt-[40px] h-[100vh]  items-start flex  justify-center flex-col gap-[8px]">

                    <h1 className=" text-[15px] md:text-[34px] font-bold ">Hi {data.email}</h1>
                    <p className="font-medium">Your Subscription will end on  {data.end_date !=   new Date(data.end_date).toISOString()} </p>
                    {data.customer_id && <button className="py-[10px] px-[18px] w-[100px] text-sm rounded-md cursor-pointer bg-[#0AA195] border-2  text-white   '" onClick={handleBiling}>Cancle</button>}          
          
                </div>
            )
        })
       }
    
  </div>

  )
}

export default SubscriptionDetails