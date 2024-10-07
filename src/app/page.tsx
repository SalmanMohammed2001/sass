


import { createClient } from "@/app/lib/supabase/client";

import { getUser } from "./login/users";
import Hero from "./components/hero/hero";
const supbase = createClient()

interface Profile {
  id?: number; 
  email: string;
  
}



export const metadata={
  title:"Home Page s",
  description:" Home Pafe Details"
  
}





export default async  function Home() {



  const  user= await getUser()   
  


  const userEmail=user?.email;
  console.log(userEmail != undefined);
  
    
  if(userEmail != undefined){

    

  const searchProfileData=async(email:string)=>{    
  const { data} = await supbase
  .from('profiles')
  .select('*')
  .eq('email', email);
    if(data?.length == 0){
    await  saveProfileUser(email)
     return;
    }


    data?.forEach((data:Profile)=>{
      if(data.email == email){
        return;
      }else{
       
        saveProfileUser(email)
      }
      
    })      
}


 const saveProfileUser = async ( userEmail:  string) => {
  const { data, error } = await supbase
    .from('profiles')
    .insert([
      { 
        email: userEmail 
      },
    ])
    .select();

  if (data) {
    subcritionEmail(userEmail);
  }

  if (error) {
    console.error('Error inserting profile:', error);
    return;
  }
};


 const subcritionEmail = async (userEmail: string) => {

  const { data, error } = await supbase
    .from('subscriptionData')
    .insert([
      { email: userEmail }  
    ])
    .select();

  if (error) {
    console.error('Error inserting subscription:', error);
  } else {
    console.log('Inserted data:', data);
  }


  
};
    
    await searchProfileData(userEmail)

  }
 

  return (

    <div className="mt-[100px] ">
     <Hero />
    </div>
  
  );
}
