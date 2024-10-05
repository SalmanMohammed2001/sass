import React from 'react'

import { redirect } from "next/navigation";

import SubscriptionDetails from './components/SubscriptionDetails';


import { createClient } from "@/app/lib/supabase/server";




export const metadata={
    title:"Profile Page",
    description:" User Profile Page"
    
  }



const Profile = async () => {



  const supabase = createClient();
  const user =  (await supabase.auth.getUser()).data.user;

  console.log(user);


    if(user==null){
      redirect('/login')

    }

   



  return (
    <div>
      
      { 
                // @ts-expect-error: someFunction is not typed, but we expect it to work
      
      <SubscriptionDetails email={user.email} />}
    </div>
  )
}

export default Profile