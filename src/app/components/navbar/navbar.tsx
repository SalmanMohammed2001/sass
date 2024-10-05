"use client"

import Link from "next/link";
import { createClient } from "@/app/lib/supabase/client";

import {useEffect, useRef, useState, useTransition} from "react";
import { getUser, logOut } from "@/app/login/users";
;
import { CiMenuBurger } from "react-icons/ci";
import style from './navBar.module.css'
import { IoIosCloseCircle } from "react-icons/io";



interface User {
    name: string;
    email: string;
   
  }


const Navbar =  () => {



    const[open,setOpen]=useState(false);

    const headerRef =  useRef<HTMLDivElement>(null); 



    

    useEffect(() => {
        const handleScroll = () => {
            if (headerRef.current) {
                if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                    headerRef.current.classList.add(`${style.sticky_header}`);
                } else {
                    headerRef.current.classList.remove(`${style.sticky_header}`);
                }
            }
        };



       


        userGetUser()


    



        window.addEventListener('scroll', handleScroll);

     
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };



        




    }, []);

  const [user,setUser]=useState<User>()

    const userGetUser=async()=>{

        const supabase = createClient();
        const user =  (await supabase.auth.getUser()).data.user;

        console.log(user);
        

  // Expecting a possible null value from findSubscription
             // @ts-expect-error: findSubscription may return null, which we handle in the subsequent logic
        
        setUser(user)
    }











    const[,startTransition]=useTransition();
    const handleClickAction=()=>{
     startTransition(async()=>{
        
      await logOut()
      userGetUser()
  
     })
     }


    return (
        <div className={`   flex  justify-between w-[100vw] fixed bg-white   z-50 border`}      >
       <div className=" w-full flex justify-between px-[100px]"> 
       <div className="flex items-center">
                <Link href={"/"} className=" text-[25px]  md:text-[44px]">BLOG SASS</Link>
            </div>

            <div className={" hidden md:flex"}>
                <nav className=" flex  items-center gap-[25px]  ">
                    <ul className=" gap-[25px] text-[14px] flex">
                        <li><Link href={"/"} className="text-black hover:text-[#0AA195]">HOME</Link></li>
                        <li><Link href={"/blogs"} className="text-black hover:text-[#0AA195]">READ</Link></li>
                        <li><Link href={"/write"} className="text-black hover:text-[#0AA195]">WRITE</Link></li>

                        { user != null  &&    <li><Link href={"/profile"} className="text-black hover:text-[#0AA195]">PROFILE</Link></li> }
                           

                    </ul>
               

              
                   { user != null ?   <a className='py-[10px] px-[18px]  text-sm rounded-md cursor-pointer border-[#0AA195] border-2  bg-green-100 text-black ' onClick={handleClickAction} >LogOut</a> :
                    <Link href={"/login"} className='py-[10px] px-[18px] text-black text-sm rounded-md cursor-pointer border-2   border-[#0AA195] '  >Login</Link>
                
            
        
    }

                </nav>                

            </div>
       </div>




            <div className=" items-center flex md:hidden mr-9 "><CiMenuBurger className="w-[40px] h-[50px] text-[#0AA195]" onClick={()=>setOpen((pre)=>!pre)} /></div>


            {
                open &&   <div className={`${style.mobileLinks}  lg:hidden`}>

                <div className='pr-5 pt-5 flex justify-end '>
                <IoIosCloseCircle  className={style.closeButton}  onClick={()=>setOpen((pre)=>!pre)}/>
                </div>

                <div className='w-[100%] h-[100%] gap-[50px] flex items-center justify-center flex-col' onClick={()=>setOpen((pre)=>!pre)}>   

                <ul className={`flex gap-[40px] text-lg items-center justify-center flex-col  transition-all duration-300 ease-in-out `}>
                <li><Link href={"/"} className="text-white ">HOME</Link></li>
                        <li><Link href={"/blogs"} className="text-white ">READ</Link></li>
                        <li><Link href={"/write"} className="text-white ">WRITE</Link></li>

                        { user != null  &&    <li><Link href={"/profile"} className="text-white hover:text-[#0AA195]">PROFILE</Link></li> }
                           
            </ul>

             
            { user != null ?   <a className='py-[10px] px-[18px]  text-sm rounded-md cursor-pointer border-[#0AA195] border-2  bg-green-100 text-black ' onClick={handleClickAction} >LogOut</a> :
                    <Link href={"/login"} className='py-[10px] px-[18px]  text-sm rounded-md cursor-pointer border-[#0AA195] border-2  bg-green-100 text-black  '  >Login</Link>
                
            
        
    }


                    </div>    
   
                </div>
       
            }


        </div>
    )
}

export default Navbar

