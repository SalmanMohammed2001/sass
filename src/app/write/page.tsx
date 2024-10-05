


import Writeblogs from "@/app/components/writeblogs/writeblogs";


import { redirect } from "next/navigation";






import { createClient } from "@/app/lib/supabase/server";

export const metadata={
  title:"Blog Write Page",
  description:"we can write own blog"
  
}


const WritePage = async() => {

  const supabase = createClient();
  const user =  (await supabase.auth.getUser()).data.user;
    if(user==null){
      redirect('/login')

    }

  return (

    <>

    <Writeblogs/>

    
    </>
    

 
   

)
 }


export default WritePage















