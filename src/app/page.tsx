



import { getUser } from "./login/users";




export const metadata={
  title:"Home Page",
  description:" Home Pafe Details"
  
}





export default async  function Home() {

  const  user= await getUser()   
  


  const userEmail=user?.email;
  console.log(userEmail != undefined);
  



  


    
  if(userEmail != undefined){

  
    
    

  }
 

  return (

    <div className="mt-[100px] ">


    </div>
  
  );
}
