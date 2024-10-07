
"use client";

import { getUser, login, signup } from './users';
import { useState, useTransition } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { createClient } from '@/app/lib/supabase/client';

import CustomInput from '../components/input/customInput';
import CustomButton from '../components/button/custombutton'; 
import Link from 'next/link';

export default function LoginPage() {

  const supabase = createClient();

  const [currState, setCurrState] = useState("Login");
  const [, startTransition] = useTransition();
  
  const [value, setValue] = useState({
    displayName: '',
    email: '',
    password: '',
    phone: '',
    otp: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateEmail = (email:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password:string) => {
    return password.length >= 6;
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value) ? "" : "Invalid email format",
      }));
    }

    if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: validatePassword(value) ? "" : "Password must be at least 6 characters",
      }));
    }
  };

  const handlerClickAction = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateEmail(value.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      return;
    }

    if (!validatePassword(value.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters",
      }));
      return;
    }

    if (currState === "Login") {
      startTransition(async () => {
        await login(value);
      });
    } else {
      startTransition(async () => {
        await signup(value);
      });
    }
  };



  
  const loginWithProvider = async (provider:'github' | 'google') => {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + `/auth/callback`,
      },
    });

    if (error) {
      console.error('Error during login with provider:', error); 
      return; 
    }

    if (data) {
      const user = await getUser();
      console.log(user);
    }
  };

  // Other functions for handling OTP and phone sign-in...

  return (
    <div className={"login-popup z-20 grid my-[100px] overflow-x-hidden"}>
      <form onSubmit={handlerClickAction} className={"login-popup-container shadow-md"}>
        <div className={"login-popup-title flex justify-between items-center text-black"}>
          <h2 className={"text-[32px] font-bold"}>{currState}</h2>
        </div>

        <div className={"login-popup-input flex flex-col gap-[15px]"}>
       
          <CustomInput
            id="email"
            name="email"
            type="email"
            placeholder="Your Email"
            value={value.email}
            onChange={handleChange}
            error={errors.email}
          />

          <CustomInput
            id="password"
            name="password"
            type="password"
            placeholder="Your Password"
            value={value.password}
            onChange={handleChange}
            error={errors.password}
          />
    
        
        

       
        </div>



        <CustomButton type="submit">
          {currState === "SignUp" ? "Create Account" : "Login"}
        </CustomButton>

        <CustomButton type="button" onClick={() => loginWithProvider("google")} className="bg-[#0AA195] flex items-center justify-center gap-[10px]">
          <FaGoogle /> Google
        </CustomButton>

        <CustomButton type="button" onClick={() => loginWithProvider("github")} className="bg-[#0AA195] flex items-center justify-center gap-[10px]">
          <FaGithub /> GitHub
        </CustomButton>

       

        {/* Other buttons for magic link and phone sign-in... */}

       

         {currState === "Login" ? (
          <p className={"text-[13px]"}>
            Create a new Account?{" "}
            <span className={"text-orange-600 font-[500] cursor-pointer"} onClick={() => setCurrState("SignUp")}>
              Click Here
            </span>
          </p>
        ) : (
          <p className={"text-[13px]"}>
            Already have an account?{" "}
            <span className={"text-orange-600 font-[500] cursor-pointer"} onClick={() => setCurrState("Login")}>
              Login here
            </span>
          </p>
        ) }

          <Link href={"/magic"} className={"text-[13px]  cursor-pointer"}>
          Login with Magic Link
        
          </Link>
        
      </form>
    </div>
  );
}


