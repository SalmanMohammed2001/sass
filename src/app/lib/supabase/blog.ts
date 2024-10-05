'use server'


import { createClient } from "./server"


const supabase = createClient()





  
export async function loadAllBlog() {
    
    
const { data: listing, error } = await supabase
.from('listing')
.select('*')

if(error){
  return error;
}

    return listing;
  }
  


 export const getUserProfileById = async (userId: string) => {
    const { data, error } = await supabase
      .from('listing')  
      .select('*')
      .eq('id', userId)
      .single(); 
  
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  
    return data;
  };
  

 