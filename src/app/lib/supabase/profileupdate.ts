"use server"


import { createClient } from "./server";

const supbase = createClient()

interface Profile {
  id?: number; 
  email: string;
  
}





export const searchProfileData=async(email:string)=>{
    const { data} = await supbase
    .from('profiles')
    .select('*')
    .eq('email', email);
      if(data?.length == 0){
   
       return;
      }


      data?.forEach((data:Profile)=>{
        if(data.email == email){
        
        }else{
         
        
        }
        
      })      
  }



 
