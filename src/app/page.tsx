



import { getUser } from "./login/users";




export const metadata={
  title:"Home Page",
  description:" Home Pafe Details"
  
}

import { searchProfileData } from "@/app/lib/supabase/profile_update";



export default async  function Home() {

  const  user= await getUser()   
  


  const userEmail=user?.email;
  console.log(userEmail != undefined);
  



  


    
  if(userEmail != undefined){

    await searchProfileData(userEmail)
    
    
    
  }
 



  


  


  return (

    <div className="mt-[100px] ">


    </div>
  
  );
}
