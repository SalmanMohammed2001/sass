

"use client";


import { useState, useTransition } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { createClient } from '@/app/lib/supabase/client';
import { useRouter } from 'next/navigation';
import CustomInput from '../components/input/customInput';
import CustomButton from '../components/button/custombutton'; 
import Swal from 'sweetalert2';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();


  
  const [email, setEmail] = useState<string>('');

  const [errors, setErrors] = useState({
    email: '',
  
  });

  const validateEmail = (email:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

 
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
      setEmail(value)

    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value) ? "" : "Invalid email format",
      }));
    }

  
  };

  const handlerClickAction = async (e:React.FormEvent<HTMLFormElement>) => {

    
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      return;
    }

    

    const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
              shouldCreateUser: true,      
            },
          })

          if(data){
            console.log(data);
            
            router.push('/subscription');
          }else{
            Swal.fire({
              icon: "error",
              title: error?.message,
              text: "Please fill in all fields correctly before submitting.",
            });
            return;
          }
         
          
      
  };



  


  // Other functions for handling OTP and phone sign-in...

  return (
    <div className={"login-popup z-20 grid my-[100px] overflow-x-hidden"}>
      <form onSubmit={handlerClickAction} className={"login-popup-container shadow-md"}>
        <div className={"login-popup-title flex justify-between items-center text-black"}>
          <h2 className={"text-[32px] font-bold"}>Email To Login</h2>
        </div>

        <div className={"login-popup-input flex flex-col gap-[15px]"}>


          
          <CustomInput
            id="email"
            name="email"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={handleChange}
            error={errors.email}
          />

    
        </div>



    
        <CustomButton type="button" onClick={handlerClickAction} className="bg-[#0AA195] flex items-center justify-center gap-[10px]">
          Magic Link
        </CustomButton>


 

      </form>
    </div>
  );
}


