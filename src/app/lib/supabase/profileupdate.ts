"use server"


import { createClient } from '@/app/lib/supabase/server'

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



 


  export const saveProfileUser = async ( userEmail:  string) => {
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


  export const subcritionEmail = async (userEmail: string) => {

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
  
